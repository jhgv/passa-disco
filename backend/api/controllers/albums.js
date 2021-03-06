const pool = require('../../database');
const validators = require('../utils/validators');
const sqlUtils = require('../utils/sqlUtils');
const querystring = require('querystring');

const getAlbumById = async albumId => {
  const [rows, fields] = await pool.query(
    `SELECT id, name, year, artist, genre, creation_date, cover_image FROM album WHERE id=${albumId}`
  );
  return rows;
};

module.exports.getAlbum = async (req, res, next) => {
  const { id } = req.params;
  const rows = await getAlbumById(id);
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
    `INSERT INTO album(collection_id, name, artist, year, genre, cover_image) VALUES(${pool.escape(
      req.body.collection
    )},${pool.escape(req.body.name)},${pool.escape(
      req.body.artist
    )},${pool.escape(req.body.year)},${pool.escape(
      req.body.genre
    )},${filePath})`
  );

  const rows = await getAlbumById(result.insertId);
  // Return the created album
  res.send(rows[0]);
};

module.exports.editAlbum = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.body);
  let filePath;
  if (req.file) {
    filePath = req.file.path;
  } else if (req.body.cover_image && req.body.cover_image !== 'null') {
    filePath = req.body.cover_image;
  } else {
    filePath = 'NULL';
  }
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
