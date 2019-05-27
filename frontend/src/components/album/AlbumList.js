import React from 'react';
import { connect } from 'react-redux';
import { fetchCollectionAlbums } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import AlbumCard from './AlbumCard';

class AlbumList extends React.Component {
  componentDidMount() {
    this.props.fetchCollectionAlbums(this.props.match.params.id);
  }

  renderAlbums() {
    if (!this.props.albums) {
      return <div>Loading albums...</div>;
    }

    if (this.props.albums.length === 0) {
      return (
        <div className="col-md-12 text-center mt-5">
          <h5>No albums found :(</h5>
        </div>
      );
    }

    return this.props.albums.map(album => {
      return (
        <AlbumCard
          key={album.id}
          album={album}
          collectionId={this.props.match.params.id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-center mb-5">
          <Link to={`/`} className="btn btn-link text-center mr-3">
            Back to collections
          </Link>
          <Link to={`album/create`} className="btn btn-primary text-center">
            <FontAwesomeIcon icon={faMusic} className="mr-1" />
            Create Album
          </Link>
        </div>

        <h2 className="text-center">{this.props.listText}</h2>

        <SearchBar collectionId={this.props.match.params.id} />

        <div className="row">{this.renderAlbums()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    albums: state.collectionAlbums,
    listText: state.listText
  };
};

export default connect(
  mapStateToProps,
  { fetchCollectionAlbums }
)(AlbumList);
