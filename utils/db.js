const mysql = require('mysql');
require('dotenv').config();

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nature_main_website',
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = { con };