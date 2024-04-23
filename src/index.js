const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('./mysql');

const app = express();
const PORT = 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(req.url);
    next();
})

const livrosRouter = require('../routes/livros');
app.use('/livros', livrosRouter);

app.listen(PORT, () => console.log(`running express server on ${PORT}`));