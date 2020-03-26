const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const Book = require('./models/bookModel');

app.use(morgan('tiny'));

const port = process.env.PORT || 3000;
const bookRouter = express.Router();

// for book session
bookRouter.route('/books')
    .get((req, res) => {
        const query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, (err, books) => {
            if (err) {
                return res.json({ error: 'unable to fetch data' });
            }
            return res.json(books);
        });
    });

bookRouter.route('/books/:bookId')
    .get((req, res) => {
        Book.findById(req.params.bookId, (err, book) => {
            if (err) {
                return res.json({ error: 'unable to fetch data' });
            }
            return res.json(book);
        });
    });

app.use('/api', bookRouter);
app.get('/', (req, res) => {
    res.json({});
});

app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`);
});
