const pool = require('../../database');
const validators = require('../utils/validators');
const sqlUtils = require('../utils/sqlUtils');

module.exports.getCollections = async (req, res, next) => {
  const [rows, fields] = await pool.query(
    'SELECT C.id, C.name, COUNT(A.id) as num_albums FROM collection C LEFT JOIN album A ON C.id = A.collection_id GROUP BY c.id'
  );
  res.send(rows);
};

module.exports.getCollection = async (req, res, next) => {
  const { id } = req.params;
  const [rows, fields] = await pool.query(
    `SELECT C.id, C.name, COUNT(A.id) as num_albums FROM collection C LEFT JOIN album A ON C.id = A.collection_id WHERE C.id=${id} GROUP BY c.id`
  );
  // Check if the query returned the album for the given id
  if (!rows || rows.length === 0) {
    res.status(404);
    next(new Error('Collection not found'));
  }
  res.send(rows[0]);
};

module.exports.getCollectionAlbums = async (req, res, next) => {
  const { id } = req.params;
  let rows = [],
    fields = [];
  // Look for the 'q' parameter to determine if it is a text search
  if (req.query && req.query.hasOwnProperty('q')) {
    const textQuery = req.query.q;
    [rows, fields] = await pool.query(
      `SELECT id, collection_id, name, year, artist, genre, cover_image, creation_date, cover_image FROM album WHERE collection_id = ${id} AND MATCH (name, artist) AGAINST ('${textQuery}*' IN BOOLEAN MODE) ORDER BY creation_date DESC`
    );
  } else {
    [rows, fields] = await pool.query(
      `SELECT id, collection_id, name, year, artist, genre, cover_image, creation_date, cover_image FROM album WHERE collection_id=${id} ORDER BY creation_date DESC`
    );
  }
  res.send(rows);
};

module.exports.createCollection = async (req, res, next) => {
  // Validate the request body
  const errorMessages = validators.validatePostCollection(req.body);
  if (Object.keys(errorMessages).length > 0) {
    // If there is any error in the validation, return an error to the user
    return res.status(500).json({ errors: errorMessages });
  }
  const [result, fields] = await pool.query(
    'INSERT INTO collection(name) VALUES(?)',
    [req.body.name]
  );
  res.send({ ...req.body, id: result.insertId });
};

module.exports.editCollection = async (req, res, next) => {
  const { id } = req.params;
  // convert the object into the sql statement for only the given fields to update
  const queryUpdatedValues = sqlUtils.parseRequestBodyToUpdateValues(req.body);
  await pool.query(
    `UPDATE collection SET ${queryUpdatedValues} WHERE id=${id}`
  );
  res.send({ ...req.body, id: parseInt(id, 10) });
};

module.exports.deleteCollection = async (req, res, next) => {
  const { id } = req.params;
  const result = await pool.query(`DELETE FROM collection WHERE id=${id}`);
  res.send(result);
};
