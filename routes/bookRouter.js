const express = require('express');
const bookController = require('../controllers/bookController');

const bookRouter = (Book) => {
    const router = express.Router();
    const controller = bookController(Book);

    router.route('/books')
        .post(controller.post)
        .get(controller.get);

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
