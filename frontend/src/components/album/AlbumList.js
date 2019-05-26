import React from 'react';
import { connect } from 'react-redux';
import { fetchAlbums } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';
import AlbumCard from './AlbumCard';

class AlbumList extends React.Component {
  componentDidMount() {
    this.props.fetchAlbums();
  }

  renderAlbums() {
    if (!this.props.albums) {
      return <div>Loading albums...</div>;
    }

    if (this.props.albums.length === 0) {
      return (
        <div className="col-md-12 text-center mt-5">
          <h5>No albums found :(</h5>
          <Link to="album/create" className="btn btn-primary btn-lg">
            <FontAwesomeIcon icon={faCompactDisc} /> Create album
          </Link>
        </div>
      );
    }

    return this.props.albums.map(album => {
      return <AlbumCard key={album.id} album={album} />;
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
