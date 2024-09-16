var mysql = require('mysql2')
var ConnectorClass = require('./Connector.js')
var FornecedorClass = require('./Fornecedor.js')
var ProdutoClass = require('./Produto.js')
 
var MySqlConnector = new ConnectorClass()
 
conn = MySqlConnector.ConnCreateDB()
 
conn.connect(function(err) {
    if (err) throw err;
    console.log("Conectado!")
    conn.query("CREATE DATABASE IF NOT EXISTS AAI2", function (err, result) {
        if (err) throw err;
        console.log("Query executada!")
    })
})
 
conn = MySqlConnector.ConnRegularQuery("AAI2")
 
conn.connect(function(err) {
    conn.query("CREATE TABLE IF NOT EXISTS Fornecedor (id_for int primary key auto_increment, nome varchar(50))", function(err, result) {
        if (err) throw err;
        console.log("Query executada")
    })
})
 
conn.connect(function(err) {
    conn.query("CREATE TABLE IF NOT EXISTS Produto (id_prod INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(50), preco int, id_for INT, FOREIGN KEY (id_for) REFERENCES Fornecedor(id_for))", function(err, result) {
        if (err) throw err;
        console.log("Query executada")
    })
})

// var Fornecedor = new FornecedorClass()
// Fornecedor.add()
 
// var Produto = new ProdutoClass()
// Produto.add()
 
conn = MySqlConnector.ConnRegularQuery("AAI2")
 
let resultados_qntd = []
 
conn.connect(function(err) {
    conn.query("SELECT f.nome, COUNT(p.id_prod) AS Quantidade FROM Fornecedor f LEFT JOIN Produto p ON f.id_for = p.id_for GROUP BY f.id_for, f.nome", function(err, result) {
        console.log("Mostrando quantidade de produtos por fornecedor")

        for (item of result) {
            console.log('+-------------------+')
            console.log(item['nome'] + ': ' + item['Quantidade'])
        }
        console.log('+-------------------+')
    })
})

conn.connect(function(err) {
    let limite_preco = 50
    conn.query(`SELECT p.nome, p.preco FROM Produto p where p.preco > ${limite_preco}`, function(err, result) {
        console.log(`Mostrando apenas produtos onde preço >= ${limite_preco}`)

        for (item of result) {
            console.log('+-------------------+')
            console.log(item['nome'] + ': ' + item['preco'])
        }
        console.log('+-------------------+')
    })
})
