import React from 'react';
import { connect } from 'react-redux';

import { fetchCollections, changeListText } from '../../actions/index';
import CollectionCard from './CollectionCard';

class CollectionList extends React.Component {
  componentDidMount() {
    this.props.fetchCollections();
  }

  renderCollections() {
    if (!this.props.collections) {
      return <div>Loading collection...</div>;
    }

    if (this.props.collections.length === 0) {
      return (
        <div className="col-md-12 text-center mt-5">
          <h5>No collections found :(</h5>
        </div>
      );
    }

    return this.props.collections.map(collection => {
      return (
        <CollectionCard
          key={collection.id}
          collection={collection}
          changeListText={this.props.changeListText}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h2 className="text-center mb-3">Collections</h2>
        <div className="card-columns text-center">
          {this.renderCollections()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { collections: state.collections };
};

export default connect(
  mapStateToProps,
  { fetchCollections, changeListText }
)(CollectionList);
