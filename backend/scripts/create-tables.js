const fs = require('fs');
const pool = require('../database');

const filesPath = require('path').dirname(require.main.filename);

const collectionTableSQL = fs
  .readFileSync(filesPath + '/collection-table.sql')
  .toString();

const albumTableSQL = fs
  .readFileSync(filesPath + '/album-table.sql')
  .toString();

createTables = async () => {
  await pool.query(collectionTableSQL);
  await pool.query(albumTableSQL);
};

console.log('Creating tables');
createTables();
console.log('Tables created.\nPress CTRL + C to exit or wait 2s');
setTimeout(function() {
  return process.exit(0);
}, 2000);
