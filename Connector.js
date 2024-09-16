var mysql = require('mysql2')

module.exports = class Connector {
    
    ConnCreateDB () {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
        })
    }

    ConnRegularQuery (dbname) {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: dbname,
        })
    }
}

