const express = require('express');

const bookRouter = (navs) => {
    const router = express.Router();

    const books = [
        {
            title: 'things fall apart',
            author: 'Chinua Achebe',
            genre: 'african literature',
            read: false
        },
        {
            title: 'Purple Hibiscus',
            author: 'Chimamanda Adichie',
            genre: 'african literature',
            read: false
        },
        {
            title: 'There was a country',
            author: 'Chinua Achebe',
            genre: 'african literature',
            read: false
        }
    ];

    // for book session
    router.route('/')
        .get((req, res) => {
            res.render('bookListView', {
                title: 'Book Session',
                navs,
                books,
            });
        });

    router.route('/:id')
        .get((req, res) => {
            const { id } = req.params;
            res.render('bookView', {
                title: books[id].title,
                book: books[id],
                navs
            });
        });
    
    return router;
};

module.exports = bookRouter;
