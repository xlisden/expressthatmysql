const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nombre-database',
  password: '123456',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

pool.getConnection((err, connection) => {
  if (err) {
    console.log(`Error`);
  } else {
    console.log(`OK`);
    connection.release();
  }
});

module.exports = promisePool;