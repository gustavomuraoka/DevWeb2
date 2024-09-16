var mysql = require('mysql2')
var Connector = require('./Connector.js')

var MySqlConnector = new Connector()

module.exports = class AddFornecedores {

    add() {
        let fornecedores = ["General Eletrics", "VALE S.A", "Taiwan SMC", "SLC Agrícola"]
        let conn = MySqlConnector.ConnRegularQuery("AAI2")
        for (let fornecedor of fornecedores) {
            conn.connect(function(err) {
                conn.query(`INSERT INTO Fornecedor(nome) VALUES ('${fornecedor}')`, function(err, result) {
                    if (err) throw err;
                    console.log("Query executada")
                })
            })
        }
    }
}

