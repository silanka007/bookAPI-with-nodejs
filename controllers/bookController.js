const bookController = (Book) => {
    const post = (req, res) => {
        const book = new Book(req.body);
        book.save();
        return res.status(201).json(book);
    };
    const get = (req, res) => {
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
    };

    return { post, get };
};

module.exports = bookController;
