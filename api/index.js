const restify = require('restify');
const errs = require('restify-errors');
var pool = require('./database');

const server = restify.createServer({
  name: 'pd',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

// Album routes
server.get('/album', async (req, res, next) => {
  var result = await pool.query(
    'SELECT id, name, year, artist, genre, creation_date, last_update FROM album'
  );
  return res.send(result);
});

server.get('/album/:id', async (req, res, next) => {
  const { id } = req.params;
  var result = await pool.query(
    `SELECT id, name, year, artist, genre, creation_date, last_update FROM album WHERE id=${id}`
  );
  if (!result || result.length === 0) {
    return res.send(new errs.NotFoundError('Album could not be found!'));
  }
  return res.send(result[0]);
});

const validatePostAlbum = ({ name, artist, genre, year }) => {
  let errors = {};
  if (!name) {
    errors.name = 'Name is required';
  }
  if (!artist) {
    errors.artist = 'Artist name is required';
  }

  if (!genre) {
    errors.genre = 'Genre is required';
  }

  if (!year) {
    errors.year = 'Year is required';
  }

  return errors;
};
server.post('/album', async (req, res, next) => {
  const name = req.body.name;
  const artist = req.body.artist;
  const year = req.body.year;
  const genre = req.body.genre;
  const errorMessages = validatePostAlbum(req.body);
  if (Object.keys(errorMessages).length > 0) {
    return res.send(409, { errors: errorMessages });
  }
  try {
    var result = await pool.query(
      `INSERT INTO album(name, artist, year, genre, creation_date) VALUES(
        ${pool.escape(name)},${pool.escape(artist)},${pool.escape(
        year
      )},${pool.escape(genre)}, ${pool.escape(new Date())})`
    );
    res.send(result);
  } catch (err) {
    res.send(new errs.InternalServerError(err));
  }
});

server.put('/album/:id', (req, res, next) => {
  const { id } = req.params;
});

server.del('/album/:id', (req, res, next) => {
  const { id } = req.params;
});
