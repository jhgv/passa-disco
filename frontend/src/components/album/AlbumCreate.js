import React from 'react';
import { connect } from 'react-redux';
import AlbumForm from './AlbumForm';
import { createAlbum } from '../../actions';

class AlbumCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createAlbum({
      ...formValues,
      collection: this.props.match.params.id
    });
  };

  render() {
    return (
      <div>
        <h2 className="text-center">Create Album</h2>
        <AlbumForm
          onSubmit={this.onSubmit}
          collectionId={this.props.match.params.id}
        />
      </div>
    );
  }
}

export default connect(
  null,
  { createAlbum }
)(AlbumCreate);
