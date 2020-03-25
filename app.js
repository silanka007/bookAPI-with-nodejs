const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const book = require('./models/bookModel');

app.use(morgan('tiny'));

const port = process.env.PORT || 3000;
const bookRouter = express.Router();

// for book session
bookRouter.route('/books')
    .get((req, res) => {
        res.json({ name: 'Paul Silanka' });
    });

app.use('/api', bookRouter);
app.get('/', (req, res) => {
    res.json({});
});

app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`);
});
