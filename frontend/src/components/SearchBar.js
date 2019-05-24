import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { searchAlbums, fetchAlbums, changeListText } from '../actions';

class SearchBar extends React.Component {
  onChange = (event, value) => {
    if (!value) {
      this.props.fetchAlbums();
      this.props.changeListText('Collection');
    } else {
      this.props.searchAlbums(value);
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
  return { albums: Object.values(state.albums) };
};

const searchBarFormWrapped = reduxForm({ form: 'searchAlbums' })(SearchBar);
export default connect(
  mapStateToProps,
  { searchAlbums, fetchAlbums, changeListText }
)(searchBarFormWrapped);
