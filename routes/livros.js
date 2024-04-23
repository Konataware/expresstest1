const express = require("express");
const { body, validationResult } = require('express-validator'); 
const router = express.Router();
const db = require('../src/mysql');

router
.route("/:book")
.get(async (req, res) => {
    res.send('Get books list by ID ')

    const bookID = parseInt(req.params.book);

    try {
        console.log(`Querying for bookID ${bookID}...`);
        const book = await db.getBookByID(bookID);
        res.json(book);
    } catch (err) {
        console.error(err);
    }
    })

.put((req, res) => {
    res.send(`Atualizar livro com ID ${req.params.book}`)
})

.delete(async(req, res) => {
    res.send(`Deletar livro com ID ${req.params.book}`)

    const bookID = parseInt(req.params.book)
    try {
        console.log(`Purging book ${bookID}...`);
        const purge = await db.deleteRow(bookID);
        res.send(`Book ${bookID} has been purged.`)
    } catch (err) {
        console.log(err)
    }
})

router
.get('/', async(req, res, next) => {
    
    try {
        const userLibrary = await db.queryBooks();
        res.send('Book query has been sent')

    } catch(err){
        console.log(err);
    }
});

router
.post('/form',
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
    
    try{
        const newBook = db.createBookRow(req.body.book, req.body.pags);
        console.log(req.body);

        res.sendStatus(201);
    } catch (err){
        console.log(err);
    }
});
module.exports = router