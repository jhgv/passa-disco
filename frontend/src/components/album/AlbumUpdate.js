import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchAlbum, updateAlbum } from '../../actions';
import AlbumForm from './AlbumForm';

class AlbumUpdate extends React.Component {
  componentDidMount() {
    this.props.fetchAlbum(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.updateAlbum(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.album) {
      return <div>Loading album...</div>;
    }
    return (
      <div>
        <AlbumForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(
            this.props.album,
            'name',
            'artist',
            'genre',
            'year',
            'cover_image'
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { album: state.albums[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchAlbum, updateAlbum }
)(AlbumUpdate);
