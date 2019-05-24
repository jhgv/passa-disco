import React from 'react';
import { connect } from 'react-redux';
import { fetchAlbums } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';

class AlbumList extends React.Component {
  componentDidMount() {
    this.props.fetchAlbums();
  }

  renderCover({ cover }) {
    if (cover) {
      return (
        <img
          src={cover}
          className="card-img"
          alt="Cover"
          style={{ maxHeight: '15em' }}
        />
      );
    }
    return <FontAwesomeIcon icon={faImage} style={{ fontSize: '15em' }} />;
  }

  renderAlbums() {
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

const mapStateToProps = (state, ownProps) => {
  return {
    albums: Object.values(state.albums),
    listText: state.listText
  };
};

export default connect(
  mapStateToProps,
  { fetchAlbums }
)(AlbumList);
