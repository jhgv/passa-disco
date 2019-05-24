const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '',
  database: 'pd'
});

createAlbumTable = conn => {
  const sql = `CREATE TABLE IF NOT EXISTS album(
      id INT AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      artist VARCHAR(255) NOT NULL,
      year INT(4) NOT NULL,
      genre VARCHAR(50) NOT NULL,
      creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      last_update TIMESTAMP,
      PRIMARY KEY (id),
      FULLTEXT (name, artist)
  );
  `;

  conn.query(sql, (error, results, fields) => {
    if (error) return console.log(error);
    console.log('Album table created succesfuly!');
  });
};

createAlbumCoverTable = conn => {
  const sql = `  CREATE TABLE IF NOT EXISTS cover_file(
    id INT AUTO_INCREMENT,
    album_id INT,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    size INT(11) NOT NULL,
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
    ); 
  `;

  conn.query(sql, (error, results, fields) => {
    if (error) return console.log(error);
    console.log(
      'Album cover table created succesfuly!\n\nPress Ctrl + C to exit.'
    );
  });
};

connection.connect(err => {
  if (err) return console.log(err);
  console.log('Database connected!');
  createAlbumTable(connection);
  createAlbumCoverTable(connection);
});
