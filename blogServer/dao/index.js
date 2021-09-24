const mysql = require('mysql')
var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234', 
    database: 'blog'
})
 //导出db
 module.exports = db