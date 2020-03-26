const express = require('express');

const bookRouter = (Book) => {
    const router = express.Router();

    router.route('/books')
        .post((req, res) => {
            const book = new Book(req.body);
            book.save();
            return res.status(201).json(book);
        })
        .get((req, res) => {
            const query = {};
            if (req.query.genre) {
                query.genre = req.query.genre;
            }
            Book.find(query, (err, books) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(books);
            });
        });

    router.route('/books/:bookId')
        // implementing middleware for querying the database for book using bookId
        .all((req, res, next) => {
            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    res.send(err);
                }
                if (book) {
                    req.book = book;
                    return next();
                }
                return res.sendStatus(404);
            });
        })
        .get((req, res) => res.send(req.book))
        .put((req, res) => {
            const { book } = req;
            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;
            book.read = req.body.read;
            book.save();
            return res.json(book);
        })
        .patch((req, res) => {
            const { book } = req;
            if (req.body._id) { // eslint-disable-line no-underscore-dangle
                delete req.body._id;// eslint-disable-line no-underscore-dangle
            }
            Object.entries(req.body).forEach((item) => {
                const key = item[0];
                const value = item[1];
                book[key] = value;
            });
            book.save((err) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(book);
            });
        })
        .delete((req, res) => {
            req.book.remove((err) => {
                if (err) {
                    return res.send(err);
                }
                return res.sendStatus(204);
            });
        });

    return router;
};

module.exports = bookRouter;
