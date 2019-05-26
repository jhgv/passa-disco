import React from 'react';
import { connect } from 'react-redux';
import { fetchAlbums } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faTrash,
  faEdit,
  faCompactDisc
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';
import albumsAPI from '../../apis/album';

class AlbumList extends React.Component {
  componentDidMount() {
    this.props.fetchAlbums();
  }

  renderCover({ cover_image }) {
    if (cover_image) {
      return (
        <img
          src={`${albumsAPI.defaults.baseURL}/${cover_image}`}
          className="card-img"
          alt="Cover"
          style={{ maxHeight: '15em' }}
        />
      );
    }
    return <FontAwesomeIcon icon={faImage} style={{ fontSize: '15em' }} />;
  }

  renderAlbums() {
    if (!this.props.albums) {
      return <div>Loading albums...</div>;
    }

    if (this.props.albums.length === 0) {
      return (
        <div className="col-md-12 text-center mt-5">
          <h5>No albums found :(</h5>
          <Link to="album/create" class="btn btn-primary btn-lg">
            <FontAwesomeIcon icon={faCompactDisc} /> Create album
          </Link>
        </div>
      );
    }

    return this.props.albums.map(album => {
      return (
        <div className="col-sm-3 mb-3" key={album.id}>
          <div className="card" style={{ width: '15rem' }}>
            {this.renderCover(album)}
            <div className="card-body">
              <h4 className="card-title">{album.name}</h4>
              <p className="card-text">by {album.artist}.</p>
              <p className="card-text text-muted">
                <small className="text-muted">
                  {album.genre} - {album.year}
                </small>
              </p>

              <Link
                to={`/album/update/${album.id}`}
                className="btn btn-outline-warning btn-sm mr-2"
              >
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <Link
                to={`/album/delete/${album.id}`}
                className="btn btn-outline-danger btn-sm"
              >
                <FontAwesomeIcon icon={faTrash} />
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <SearchBar />
        <h2 className="text-center">{this.props.listText}</h2>
        <div className="row">{this.renderAlbums()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    albums: Object.values(state.albums),
    listText: state.listText
  };
};

export default connect(
  mapStateToProps,
  { fetchAlbums }
)(AlbumList);
