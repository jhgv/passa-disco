const restify = require('restify');
const errs = require('restify-errors');

const mysql = require('mysql');

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

execSQLQuery = (sqlQry, res) => {
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'pd'
  });

  connection.query(sqlQry, function(error, results, fields) {
    if (error) res.json(error);
    else res.json(results);
    connection.end();
  });
};

// Album routes
server.get('/album', (req, res, next) => {
  execSQLQuery('SELECT id, name, year, artist FROM album', res);
});

server.get('/album/:id', (req, res, next) => {
  const { id } = req.params;
});

server.post('/album', (req, res, next) => {});

server.put('/album/:id', (req, res, next) => {
  const { id } = req.params;
});

server.del('/album/:id', (req, res, next) => {
  const { id } = req.params;
});
