const restify = require('restify');
const albumHandlers = require('./handlers/album');
const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*'],
  allowHeaders: ['*'],
  exposeHeaders: []
});

const server = restify.createServer({
  name: 'pd',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

server.get('/album', albumHandlers.getAlbums);
server.get('/album/:id', albumHandlers.getAlbum);
server.post('/album', albumHandlers.createAlbum);
server.put('/album/:id', albumHandlers.editAlbum);
server.del('/album/:id', albumHandlers.deleteAlbum);
