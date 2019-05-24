const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '',
  database: 'pd'
});

function createAlbumTable(conn) {
  const sql = `CREATE TABLE IF NOT EXISTS album(
      id INT AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      artist VARCHAR(255) NOT NULL,
      year INT(4) NOT NULL,
      genre VARCHAR(50) NOT NULL,
      creation_date TIMESTAMP NOT NULL,
      last_update TIMESTAMP,
      cover MEDIUMBLOB,
      PRIMARY KEY (id)
  );`;

  conn.query(sql, function(error, results, fields) {
    if (error) return console.log(error);
    console.log('Album table created succesfuly! Press Ctrl + C to exit.');
  });
}

connection.connect(function(err) {
  if (err) return console.log(err);
  console.log('Database connected!');
  createAlbumTable(connection);
});
