import React from 'react';
import { connect } from 'react-redux';
import { fetchDiscs } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';

class DiscList extends React.Component {
  componentDidMount() {
    this.props.fetchDiscs();
  }

  renderCover({ cover }) {
    if (cover) {
      return (
        <img
          src={cover}
          className="card-img"
          alt="Cover"
          style={{ maxHeight: '15em' }}
        />
      );
    }
    return <FontAwesomeIcon icon={faImage} style={{ fontSize: '15em' }} />;
  }

  renderDiscs() {
    return this.props.discs.map(disc => {
      return (
        <div className="col-sm-3 mb-3" key={disc.id}>
          <div className="card" style={{ width: '15rem' }}>
            {this.renderCover(disc)}
            <div className="card-body">
              <h5 className="card-title">{disc.title}</h5>
              <p className="card-text text-muted">by {disc.artist}.</p>

              <Link
                to={`/discs/update/${disc.id}`}
                className="btn btn-outline-warning btn-sm mr-2"
              >
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <Link
                to={`/discs/delete/${disc.id}`}
                className="btn btn-outline-danger btn-sm"
              >
                <FontAwesomeIcon icon={faTrash} />
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <SearchBar />
        <h2 className="text-center">{this.props.listText}</h2>
        <div className="row">{this.renderDiscs()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    discs: Object.values(state.discs),
    listText: state.listText
  };
};

export default connect(
  mapStateToProps,
  { fetchDiscs }
)(DiscList);
