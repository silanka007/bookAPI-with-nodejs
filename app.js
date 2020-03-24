const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();

const bookRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_module/jquery/dist/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

// for book session
bookRouter.route('/')
    .get((req, res) => {
        res.render('books', {
            title: 'Book Session',
        });
    });

bookRouter.route('/single')
    .get((req, res) => {
        res.send('this is a single book session');
    });

app.use('/books', bookRouter);
app.get('/', (req, res) => {
    res.render('index', {
        title: 'book library',
        nav: [
            { link: '/', title: 'HOME' },
            { link: '/books', title: 'BOOKS' },
            { link: '/author', title: 'AUTHOR' },
        ],
    });
});

app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`);
});
