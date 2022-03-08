const express = require('express');
const mysql = require('mysql')

var Router = express.Router();
var PORT = process.env.PORT;
var ConnPool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// create database and MESSAGE table if not exist
ConnPool.query('CREATE DATABASE IF NOT EXISTS logging', function (err) {
  if (err) throw Error('\n\t **** error creating database **** ' + err)
  
  console.log('\n\t ==== database logging created !! ====')
  
  ConnPool.query('USE logging', function (err) {
  if (err) throw Error('\n\t **** error using database **** ' + err);
  
  console.log('\n\t ==== database logging switched !! ====')
  
    ConnPool.query('CREATE TABLE IF NOT EXISTS messages('
    + 'id INT NOT NULL AUTO_INCREMENT,'
    + 'PRIMARY KEY(id),'
    + 'ip VARCHAR(100)'
    + ')', function (err) {
    if (err) throw Error('\n\t **** error creating table **** ' + err);
    });
  });
});

Router.get('/', function (req, res) {
  ConnPool.getConnection(function (errConn, conn) {
    if (errConn) throw Error('error get connection : ' + errConn)
  
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    var query = `INSERT INTO logging (ip) VALUES (${ip});`;

    conn.query(query, function (errSelect, rows) {
      if (errSelect) throw Error('Error insert ' + errSelect)
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      
      var result = {
        success: true,
        rows: rows.length,
      }
      res.write(JSON.stringify(rows));
      res.end();
    })
  })
})
  
module.exports = Router