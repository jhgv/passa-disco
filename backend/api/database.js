const mysql = require('mysql2');
const poolConnection = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  port: 3306,
  password: '',
  database: 'pd'
});

poolConnection.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }
  if (connection) connection.release();
  return;
});

module.exports = poolConnection.promise();
