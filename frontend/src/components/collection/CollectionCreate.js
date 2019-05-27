import React from 'react';
import { connect } from 'react-redux';
import { createCollection } from '../../actions';
import CollectionForm from './CollectionForm';

class CollectionCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createCollection({
      ...formValues
    });
  };

  render() {
    return (
      <div>
        <h2 className="text-center">Create Collection</h2>
        <CollectionForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { createCollection }
)(CollectionCreate);
