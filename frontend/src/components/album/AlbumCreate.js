import React from 'react';
import { connect } from 'react-redux';
import AlbumForm from './AlbumForm';
import { createAlbum } from '../../actions';

class AlbumCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createAlbum(formValues);
  };

  render() {
    return (
      <div>
        <h2>Create Album</h2>
        <AlbumForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { createAlbum }
)(AlbumCreate);
