const pool = require('../database');
const errs = require('restify-errors');
const validators = require('../util/validators');
const sqlParsers = require('../util/sqlParsers');

module.exports.getAlbums = async (req, res, next) => {
  var result = await pool.query(
    'SELECT id, name, year, artist, genre, creation_date, last_update FROM album'
  );
  res.send(result);
  return next();
};

module.exports.getAlbum = async (req, res, next) => {
  const { id } = req.params;
  var result = await pool.query(
    `SELECT id, name, year, artist, genre, creation_date, last_update FROM album WHERE id=${id}`
  );
  if (!result || result.length === 0) {
    return res.send(new errs.NotFoundError('Album could not be found!'));
  }
  res.send(result[0]);
  return next();
};

module.exports.createAlbum = async (req, res, next) => {
  const errorMessages = validators.validatePostAlbum(req.body);
  if (Object.keys(errorMessages).length > 0) {
    res.send(409, { errors: errorMessages });
    return next();
  }
  var result = await pool.query(
    `INSERT INTO album(name, artist, year, genre, creation_date) VALUES(
        ${pool.escape(req.body.name)},${pool.escape(
      req.body.artist
    )},${pool.escape(req.body.year)},${pool.escape(
      req.body.genre
    )}, ${pool.escape(new Date())})`
  );
  res.send(result);
  return next();
};

module.exports.editAlbum = async (req, res, next) => {
  const { id } = req.params;
  const queryUpdatedValues = sqlParsers.parseRequestBodyToUpdateValues(
    req.body
  );
  const result = await pool.query(
    `UPDATE album SET ${queryUpdatedValues} WHERE id=${id}`
  );
  res.send(result);
  return next();
};

module.exports.deleteAlbum = async (req, res, next) => {
  const { id } = req.params;
  const result = await pool.query(`DELETE FROM album WHERE id=${id}`);
  res.send(result);
  return next();
};
