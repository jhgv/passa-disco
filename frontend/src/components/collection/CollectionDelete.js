import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCollection, deleteCollection } from '../../actions';

class CollectionDelete extends React.Component {
  componentDidMount() {
    this.props.fetchCollection(this.props.match.params.id);
  }

  onConfirmDeletion = () => {
    this.props.deleteCollection(this.props.match.params.id);
  };

  renderWarningMessage() {
    if (this.props.collection.num_albums === 0) {
      return null;
    }
    return (
      <p>
        This collection contains {this.props.collection.num_albums} album(s) and
        they will be deleted as well.
      </p>
    );
  }

  render() {
    if (!this.props.collection) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h2>
          Do you want to delete the collection '{this.props.collection.name}'?
        </h2>
        {this.renderWarningMessage()}
        <Link to={`/`} className="btn btn-outline-secondary btn-lg mr-2">
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

const mapStateToProps = state => {
  return { collection: state.collection };
};

export default connect(
  mapStateToProps,
  { fetchCollection, deleteCollection }
)(CollectionDelete);
