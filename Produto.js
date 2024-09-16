var mysql = require('mysql2')
var Connector = require('./Connector.js')
 
var MySqlConnector = new Connector()
 
module.exports = class AddProdutos {
 
    add() {
        let produtos = [['Motor Elétrico', 28, 1], ['Vidro Elétrico', 56, 1], ['Minério de Ferro', 100, 2], ['Minério de Cobre', 100, 2], ['Microcontrolador', 125, 3], ['Soja', 50, 4], ['Algodão', 67, 4]]
        let conn = MySqlConnector.ConnRegularQuery("AAI2")
        for (let produto of produtos) {
            conn.connect(function(err) {
                conn.query(`INSERT INTO Produto(nome, preco, id_for) VALUES ('${produto[0]}', '${produto[1]}', '${produto[2]}')`, function(err, result) {
                    if (err) throw err;
                    console.log("Query executada")
                })
            })
        }
    }
}