const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
const navs = [
    { link: '/books', title: 'BOOKS' },
    { link: '/authors', title: 'AUTHORS' },
];

const bookRouter = require('./src/routes/bookRoutes')(navs);

app.use('/books', bookRouter);
app.get('/', (req, res) => {
    res.render('index', {
        title: 'book library',
        navs,
    });
});

app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`);
});
