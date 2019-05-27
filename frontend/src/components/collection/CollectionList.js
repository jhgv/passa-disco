import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCollections, changeListText } from '../../actions/index';
import CollectionCard from './CollectionCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

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
        <div className="text-center mb-5">
          <Link
            to={`/collection/create`}
            className="btn btn-primary text-center"
          >
            <FontAwesomeIcon icon={faMusic} className="mr-1" />
            Create Collection
          </Link>
        </div>
        <div className="text-center row">{this.renderCollections()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { collections: Object.values(state.collections) };
};

export default connect(
  mapStateToProps,
  { fetchCollections, changeListText }
)(CollectionList);
