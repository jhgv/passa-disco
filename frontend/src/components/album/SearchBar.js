import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import {
  searchAlbums,
  fetchCollectionAlbums,
  changeListText
} from '../../actions';

class SearchBar extends React.Component {
  onChange = (event, value) => {
    if (!value) {
      this.props.fetchCollectionAlbums(this.props.collectionId);
      this.props.changeListText('Albums');
    } else {
      this.props.searchAlbums(this.props.collectionId, value);
      this.props.changeListText(`Search results for "${value}"`);
    }
  };

  renderInput = ({ input }) => {
    return (
      <input
        {...input}
        autoComplete="off"
        className="form-control"
        placeholder="Search for albums"
      />
    );
  };

  render() {
    return (
      <form>
        <div className="input-group input-group-lg mb-5">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-lg">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
          <Field
            name="search"
            component={this.renderInput}
            onChange={this.onChange}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return { albums: state.collectionAlbums };
};

const searchBarFormWrapped = reduxForm({ form: 'searchAlbums' })(SearchBar);
export default connect(
  mapStateToProps,
  { searchAlbums, fetchCollectionAlbums, changeListText }
)(searchBarFormWrapped);
