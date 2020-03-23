const express = require('express');
const chalk = require('chalk');

const app = express();
const port = 3000;
app.get('/', (req, res)=> {
    res.send('hello from silanka');
})

app.listen(port, ()=> {
    console.log(`listening on port ${chalk.green(port)}`)
})