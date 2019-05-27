module.exports.validatePostAlbum = ({
  collection,
  name,
  artist,
  genre,
  year
}) => {
  let errors = {};
  if (!collection) {
    errors.collection = 'Collection id is required';
  }
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

module.exports.validatePostCollection = ({ name }) => {
  let errors = {};
  if (!name) {
    errors.name = 'Name is required';
  }
  return errors;
};
