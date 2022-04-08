const res = require('express/lib/response');

async function main() {
  const mysql    = require('mysql2/promise');
  const express  = require('express');
  const app      = express();
  const port     = process.env.PORT || 3000;
  const connOpts = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    multipleStatements: true
  };
  const conn = await mysql.createConnection(connOpts);

  // Close the connection on ctrl+c.
  process.on('SIGINT', close);

  // Get all users route.
  app.get('/', getData);

  app.listen(port);
  console.log(`Listening on port ${port}.`);
  
  async function close() {
    await conn.end();
    process.exit(0);
  }
  

  const { promisify } = require('util');
  const exec = promisify(require('child_process').exec)

  async function getData(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    var query = `INSERT INTO logging (ip) VALUES ('${ip}');`;

    const [log] = await conn.query(query);

    var command_memory = 'cat /sys/fs/cgroup/memory/memory.usage_in_bytes'
    var command_cpu = "cat /sys/fs/cgroup/cpuacct/cpuacct.usage"
    const command_os='cat /etc/os-release'

    const memory = await exec(command_memory)
    const cpu = await exec(command_cpu)
    const os = await exec(command_os)

    // res.send(`${os.stdout}`);
    res.send('Irena Irmalasari - Xendit - Trial 4 Maret - 31 Maret');
    // res.send(`Docker Memory Usage: ${memory.stdout} & Docker CPU Usage: ${cpu.stdout}`)
  }
}

main();