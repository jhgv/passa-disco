const pool = require('../../../api/database');
const chai = require('chai');

const defaultAlbum = {
  name: 'This in an test album',
  artist: 'TestArtist',
  year: 2018,
  genre: 'Rock'
};

let album = null;

beforeEach(async () => {
  await pool.query('DELETE FROM album');
  const [result, f] = await pool.query(
    'INSERT INTO album(name, artist, genre, year) VALUES (?,?,?,?)',
    [
      defaultAlbum.name,
      defaultAlbum.artist,
      defaultAlbum.genre,
      defaultAlbum.year
    ]
  );
  const [rows, f2] = await pool.query(
    `SELECT * FROM album WHERE id = ${result.insertId}`
  );
  album = rows[0];
});

after(async () => {
  await pool.query('DELETE FROM album');
});

describe('Album', () => {
  it('GET /album should return a list of albums', done => {
    request.get('/album').end((err, res) => {
      chai.expect(res.body[0].name).to.be.eql(album.name);
      chai.expect(res.body[0].artist).to.be.eql(album.artist);
      chai.expect(res.body[0].genre).to.be.eql(album.genre);
      chai.expect(res.body[0].year).to.be.eql(album.year);
      done(err);
    });
  });

  it('GET /album/:id should return a single album', done => {
    request.get(`/album/${album.id}`).end((err, res) => {
      chai.expect(res.body.id).to.be.eql(album.id);
      chai.expect(res.body.name).to.be.eql(album.name);
      chai.expect(res.body.artist).to.be.eql(album.artist);
      chai.expect(res.body.genre).to.be.eql(album.genre);
      chai.expect(res.body.year).to.be.eql(album.year);
      done(err);
    });
  });

  it('GET /album/:id should return 404 if no album with given id exists', done => {
    request.get(`/album/${album.id + 1}`).end((err, res) => {
      chai.expect(res.status).to.be.eql(404);
      chai.expect(res.body).to.be.eql({
        error: {
          message: 'Album not found'
        }
      });
      done(err);
    });
  });

  it('POST /album should create a single album', done => {
    request
      .post(`/album`)
      .send(defaultAlbum)
      .end((err, res) => {
        chai.expect(res.body.name).to.be.eql(album.name);
        chai.expect(res.body.artist).to.be.eql(album.artist);
        chai.expect(res.body.genre).to.be.eql(album.genre);
        chai.expect(res.body.year).to.be.eql(album.year);
        done(err);
      });
  });

  it('POST /album should NOT create album when missing params', done => {
    request
      .post(`/album`)
      .send({})
      .end((err, res) => {
        chai.expect(res.status).to.be.eql(500);
        chai.expect(res.body).to.be.eql({
          errors: {
            name: 'Name is required',
            artist: 'Artist name is required',
            genre: 'Genre is required',
            year: 'Year is required'
          }
        });
        done(err);
      });
  });

  it('PATCH /album/{:id} should update an album', done => {
    const newAlbum = {
      name: 'New name',
      artist: 'ArttistTest',
      year: 2017,
      genre: 'Reggae'
    };
    request
      .patch(`/album/${album.id}`)
      .send(newAlbum)
      .end((err, res) => {
        chai.expect(res.body.name).to.be.eql(newAlbum.name);
        chai.expect(res.body.artist).to.be.eql(newAlbum.artist);
        chai.expect(res.body.year).to.be.eql(newAlbum.year);
        chai.expect(res.body.genre).to.be.eql(newAlbum.genre);
        done(err);
      });
  });

  it('DELETE /album/{:id} should delete an album', done => {
    request.delete(`/album/${album.id}`).end(async (err, res) => {
      const [rows, f2] = await pool.query(
        `SELECT * FROM album WHERE id = ${album.id}`
      );
      chai.expect(rows).to.be.empty;
      done(err);
    });
  });
});
