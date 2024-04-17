const express = require('express');
const { body, validationResult } = require('express-validator');
//const db = require('./mysql');

const app = express();
const PORT = 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(req.url);
    next();
})

app.listen(PORT, () => console.log(`running express server on ${PORT}`));

const userLibrary = []

app.get(
    '/livros',
    (req, res, next) => {
        console.log('Before Handling Req');
        next();
    },
    (req, res, next) => {
        console.log(userLibrary)
        res.send(userLibrary);
        next();
    }
);

app.post(
    '/livros',
    [
    body('book').notEmpty().isString(),
    body('pags').notEmpty().isInt(), 
    ],

    (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(`
        Field: ${errors.param}, 
        Value: ${req.body[errors.param]}, 
        Error: ${errors.msg}`);
        
        return res.status(400).json({ errors: errors.array() })
    }
    console.log(req.body);
    const pags = parseInt(req.body.pags);
    userLibrary.push({ book: req.body.book, pags: pags});
    res.sendStatus(201);
});