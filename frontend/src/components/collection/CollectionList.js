import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { fetchCollections, changeListText } from '../../actions/index';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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
          {/* <Link to="album/create" className="btn btn-primary btn-lg">
            <FontAwesomeIcon icon={faList} /> Create album
          </Link> */}
        </div>
      );
    }

    return this.props.collections.map(collection => {
      return (
        <div className="card" key={collection.id}>
          <div className="card-body">
            <h5 className="card-title">{collection.name}</h5>
            <p className="card-text">
              <small className="text-muted">
                {collection.num_albums} album(s)
              </small>
            </p>
            <Link
              onClick={() => {
                this.props.changeListText(collection.name);
              }}
              to={`/collection/${collection.id}/albums`}
              className="btn btn-primary  mr-2"
            >
              See Albums
            </Link>
            <Link
              to={`/collection/update/${collection.id}`}
              className="btn btn-outline-warning mr-2"
            >
              <FontAwesomeIcon icon={faEdit} />
            </Link>
            <Link
              to={`/collection/delete/${collection.id}`}
              className="btn btn-outline-danger"
            >
              <FontAwesomeIcon icon={faTrash} />
            </Link>
          </div>
        </div>
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
