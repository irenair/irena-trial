'use strict';

const express = require('express');
const os = require('os');
const mysql = require('mysql')
require("dotenv").config();

// Constants
const PORT = process.env.NODE_DOCKER_PORT || 8080;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rena3199',
  database: 'irena_trial'
})



// App
const app = express();
app.get('/', (req, res) => {
  res.send(`Hello World, ${os.hostname()}`);
  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
  console.log(ip, os.hostname())

  connection.connect()
  const query = `INSERT INTO logging (ip) VALUES ('${ip}');`;

  connection.query(query, (err, rows, fields) => {
  if (err) throw err

    console.log(rows);
  })

  connection.end()
});

app.listen(PORT);
console.log(`Running on port ${PORT} \nOS: ${os.hostname()}`);