async function main() {
  const mysql    = require('mysql2/promise');
  const express  = require('express');
  const app      = express();
  const port     = process.env.PORT || 3000;
  const connOpts = {
    host     : process.env.DB_HOST || 'localhost',
    user     : process.env.DB_USER || 'root',
    password : process.env.DB_PASSWORD || 'rena3199',
    database : process.env.DB_DATABASE || 'logging',
    multipleStatements: true
  };
  const conn = await mysql.createConnection(connOpts);

  // Close the connection on ctrl+c.
  process.on('SIGINT', close);

  // Hello, world route.
  app.get('/', (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    res.json({hello: ip})
  });

  // Get all users route.
  app.get('/users', getAllUsers);

  app.listen(port);
  console.log(`Listening on port ${port}.`);
  
  async function close() {
    await conn.end();
    process.exit(0);
  }

  async function getAllUsers(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    var query = `INSERT INTO logging (ip) VALUES (${String(ip.split('::')[1])});`;

    const [log] = await conn.query(query);
    res.send(`OS: Linux (manual) \nIP: ${ip} \nResult mysql:${log.serverStatus}`);
  }
}

main();