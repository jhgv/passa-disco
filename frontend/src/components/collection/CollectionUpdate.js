import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCollection, updateCollection } from '../../actions';
import CollectionForm from './CollectionForm';

class CollectionUpdate extends React.Component {
  componentDidMount() {
    this.props.fetchCollection(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.updateCollection(this.props.match.params.id, formValues);
  };

  render() {
    if (_.isEmpty(this.props.collection)) {
      return <div>Loading collection...</div>;
    }
    return (
      <div>
        <h2 className="text-center">Edit Collection</h2>
        <CollectionForm
          onSubmit={this.onSubmit}
          collectionId={this.props.match.params.collectionId}
          initialValues={_.pick(
            this.props.collection,
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
  return { collection: state.collections[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchCollection, updateCollection }
)(CollectionUpdate);
