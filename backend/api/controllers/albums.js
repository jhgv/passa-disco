const pool = require('../database');
const validators = require('../utils/validators');
const sqlUtils = require('../utils/sqlUtils');

module.exports.getAlbums = async (req, res, next) => {
  let rows = [],
    fields = [];
  if (req.query && req.query.hasOwnProperty('q')) {
    const textQuery = req.query.q;
    [rows, fields] = await pool.query(
      `SELECT id, name, year, artist, genre, creation_date, cover_image FROM album WHERE MATCH (name, artist) AGAINST ('${textQuery}*' IN BOOLEAN MODE)`
    );
  } else {
    [rows, fields] = await pool.query(
      'SELECT id, name, year, artist, genre, creation_date, cover_image FROM album'
    );
  }
  res.send(rows);
};

module.exports.getAlbum = async (req, res, next) => {
  const { id } = req.params;
  var [rows, fields] = await pool.query(
    `SELECT id, name, year, artist, genre, creation_date, cover_image FROM album WHERE id=${id}`
  );
  if (!rows || rows.length === 0) {
    res.status(404);
    next(new Error('Album not found'));
  }
  res.send(rows[0]);
};

module.exports.createAlbum = async (req, res, next) => {
  const errorMessages = validators.validatePostAlbum(req.body);
  if (Object.keys(errorMessages).length > 0) {
    res.status(500).json({ errors: errorMessages });
  }
  const filePath = req.file ? pool.escape(req.file.path) : 'NULL';
  var [result, fields] = await pool.query(
    `INSERT INTO album(name, artist, year, genre, cover_image) VALUES(
        ${pool.escape(req.body.name)},${pool.escape(
      req.body.artist
    )},${pool.escape(req.body.year)},${pool.escape(
      req.body.genre
    )}, ${filePath})`
  );
  res.send({ ...req.body, id: result.insertId });
};

module.exports.editAlbum = async (req, res, next) => {
  const { id } = req.params;
  const queryUpdatedValues = sqlUtils.parseRequestBodyToUpdateValues(req.body);
  var [result, fields] = await pool.query(
    `UPDATE album SET ${queryUpdatedValues} WHERE id=${id}`
  );
  res.send({ ...req.body, id: parseInt(id, 10) });
};

module.exports.deleteAlbum = async (req, res, next) => {
  const { id } = req.params;
  const result = await pool.query(`DELETE FROM album WHERE id=${id}`);
  res.send(result);
};
