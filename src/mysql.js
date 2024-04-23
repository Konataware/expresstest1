const { query } = require('express');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Admin123$',
    port: '3306',
    database: 'library1'
})
console.log('BD conectado!')

module.exports = {
    pool,
    queryBooks,
    getBookByID,
    createBookRow,
    deleteRow,

}

async function queryBooks(){
    try{
        const [rows] = await pool.query('SELECT * FROM Biblioteca');

        for (let row of rows) {
        console.log({
            id: row.LivroID,
            book: row.LivroTitulo,
            pags: row.LivroPaginas
            });  
        };
    } catch(err) {
        console.log(`Oh não! Erro encontrado: ${err}`);
    }
}

async function getBookByID(inputID){
    try{
        const [rows] = await pool.query(`SELECT LivroTitulo, LivroPaginas FROM Biblioteca WHERE LivroID = ${inputID}`);
        if(rows.length > 0){
            console.log({
                id: inputID,
                book: rows[0].LivroTitulo,
                pags: rows[0].LivroPaginas,
                });
        }
        else{
            console.log(`Erro! Nenhum livro encontrado com o ID: ${inputID}`)
        }

    } catch(err){
        console.log(`Oh não! Erro encontrado: ${err}`);
    }
}

async function createBookRow(title, pags){
    try{
        const [rows] = await pool.query(
            `INSERT INTO Biblioteca(LivroTitulo, LivroPaginas)
            VALUES(?, ?)`,
            [title, pags]
        );
        console.log(`Book ${title} has been created.`)
        
    } catch(err){
        console.log(`Oh não! Erro encontrado: ${err}`);
    }
}

async function deleteRow(inputID){
    try{
        const [rows, fields] = await pool.query(`DELETE FROM Biblioteca WHERE LivroID = ${inputID}`)
        console.log(`Book from ${inputID}, has been deleted.`)
        
    } catch(err){
        console.log(`Oh não! Erro encontrado: ${err}`);
    }
}

