module.exports.validatePostAlbum = ({ name, artist, genre, year }) => {
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
