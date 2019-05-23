import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDisc, deleteDisc } from '../../actions';

class DiscDelete extends React.Component {
  componentDidMount() {
    this.props.fetchDisc(this.props.match.params.id);
  }

  onConfirmDeletion = () => {
    this.props.deleteDisc(this.props.match.params.id);
  };

  render() {
    if (!this.props.disc) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h2>Do you want to delete this disc?</h2>
        <h6>
          {this.props.disc.artist} - {this.props.disc.title}
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
  return { disc: state.discs[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchDisc, deleteDisc }
)(DiscDelete);
