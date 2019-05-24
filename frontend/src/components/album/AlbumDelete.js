import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAlbum, deleteAlbum } from '../../actions';

class AlbumDelete extends React.Component {
  componentDidMount() {
    this.props.fetchAlbum(this.props.match.params.id);
  }

  onConfirmDeletion = () => {
    this.props.deleteAlbum(this.props.match.params.id);
  };

  render() {
    if (!this.props.album) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h2>Do you want to delete this album?</h2>
        <h6>
          {this.props.album.artist} - {this.props.album.name}
        </h6>
        <Link to="/" className="btn btn-outline-secondary btn-lg mr-2">
          Cancel
        </Link>
        <button
          type="button"
          className="btn btn-danger btn-lg"
          onClick={this.onConfirmDeletion}
        >
          Yes, delete it!
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { album: state.albums[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchAlbum, deleteAlbum }
)(AlbumDelete);
