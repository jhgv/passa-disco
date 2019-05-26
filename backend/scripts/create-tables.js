const fs = require('fs');
const pool = require('../database');

const filesPath = require('path').dirname(require.main.filename);
const albumTableSQL = fs
  .readFileSync(filesPath + '/album-table.sql')
  .toString();

createAbumTable = async () => {
  await pool.query(albumTableSQL);
};

console.log('Creating tables');
createAbumTable();
console.log('Tables created.\nPress CTRL + C to exit or wait 2s');
setTimeout(function() {
  return process.exit(0);
}, 2000);
