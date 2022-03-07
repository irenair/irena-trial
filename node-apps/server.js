'use strict';

const express = require('express');
const os = require('os');

// Connection to DB
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});


// App
const app = express();
app.get('/', (req, res) => {
  res.send(`Hello World, ${os.hostname()}`);
  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
  console.log(ip, os.hostname())
  
  connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = `INSERT INTO logging (ip) VALUES (${ip});`
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
});
});

app.listen(PORT);
console.log(`Running on port ${PORT} \nOS: ${os.hostname()}`);