const pool = require('../../database');
const validators = require('../utils/validators');
const sqlUtils = require('../utils/sqlUtils');
const querystring = require('querystring');

module.exports.getAlbums = async (req, res, next) => {
  let rows = [],
    fields = [];
  // Look for the 'q' parameter to determine if it is a text search
  if (req.query && req.query.hasOwnProperty('q')) {
    const textQuery = req.query.q;
    [rows, fields] = await pool.query(
      `SELECT id, name, year, artist, genre, creation_date, cover_image FROM album WHERE MATCH (name, artist) AGAINST ('${textQuery}*' IN BOOLEAN MODE) ORDER BY creation_date DESC`
    );
  } else {
    [rows, fields] = await pool.query(
      'SELECT id, name, year, artist, genre, creation_date, cover_image FROM album ORDER BY creation_date DESC'
    );
  }
  res.send(rows);
};

module.exports.getAlbum = async (req, res, next) => {
  const { id } = req.params;
  const [rows, fields] = await pool.query(
    `SELECT id, name, year, artist, genre, creation_date, cover_image FROM album WHERE id=${id}`
  );
  // Check if the query returned the album for the given id
  if (!rows || rows.length === 0) {
    res.status(404);
    next(new Error('Album not found'));
  }
  res.send(rows[0]);
};

module.exports.createAlbum = async (req, res, next) => {
  // Validate the request body
  const errorMessages = validators.validatePostAlbum(req.body);
  if (Object.keys(errorMessages).length > 0) {
    // If there is any error in the validation, return an error to the user
    return res.status(500).json({ errors: errorMessages });
  }
  // If not cover image was given, set the value as NULL
  const filePath = req.file ? pool.escape(req.file.path) : 'NULL';
  const [result, fields] = await pool.query(
    `INSERT INTO album(name, artist, year, genre, cover_image) VALUES(
        ${pool.escape(req.body.name)},${pool.escape(
      req.body.artist
    )},${pool.escape(req.body.year)},${pool.escape(
      req.body.genre
    )}, ${filePath})`
  );
  // Return the created album with its id
  res.send({ ...req.body, id: result.insertId });
};

module.exports.editAlbum = async (req, res, next) => {
  const { id } = req.params;
  const filePath = req.file ? req.file.path : req.body.cover_image;
  // Adding the filepath to the request payload object
  const reqBodyWithFilePath = { ...req.body, cover_image: filePath };
  // convert the object into the sql statement for only the given fields to update
  const queryUpdatedValues = sqlUtils.parseRequestBodyToUpdateValues(
    reqBodyWithFilePath
  );
  await pool.query(`UPDATE album SET ${queryUpdatedValues} WHERE id=${id}`);
  res.send({ ...req.body, id: parseInt(id, 10) });
};

module.exports.deleteAlbum = async (req, res, next) => {
  const { id } = req.params;
  const result = await pool.query(`DELETE FROM album WHERE id=${id}`);
  res.send(result);
};
