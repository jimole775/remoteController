/** 2018/11/1 by Andy
 *
 **/
const mysql = require("mysql");

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'yiibaidb'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    // if (error) throw error;
    console.log('The solution is: ', arguments);
});
