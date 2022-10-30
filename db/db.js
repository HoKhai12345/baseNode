var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});
// connect to database
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;