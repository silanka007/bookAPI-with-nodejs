const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
mongoose.connect('mongodb://localhost/bookAPI', { useNewUrlParser: true, useUnifiedTopology: true });
const Book = require('./models/bookModel');

const bookRouter = require('./routes/bookRouter')(Book);

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use('/api', bookRouter);
app.get('/', (req, res) => {
    res.json({});
});

app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`);
});
