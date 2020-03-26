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
                    return res.json({ error: 'unable to fetch data' });
                }
                return res.json(books);
            });
        });

    router.route('/books/:bookId')
        .get((req, res) => {
            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    return res.json({ error: 'unable to fetch data' });
                }
                return res.json(book);
            });
        });
    return router;
};

module.exports = bookRouter;
