import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { searchDiscs, fetchDiscs, changeListText } from '../actions';

class SearchBar extends React.Component {
  onSubmit = formValues => {
    if (!formValues.search) {
      this.props.fetchDiscs();
      this.props.changeListText('Collection');
    } else {
      this.props.searchDiscs(formValues.search);
      this.props.changeListText(`Search results for "${formValues.search}"`);
    }
  };

  renderInput = ({ input }) => {
    return (
      <input
        {...input}
        autoComplete="off"
        className="form-control"
        placeholder="Search for discs"
      />
    );
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div className="input-group input-group-lg mb-5">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-lg">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
          <Field name="search" component={this.renderInput} />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return { discs: Object.values(state.discs) };
};

const searchBarFormWrapped = reduxForm({ form: 'searchDiscs' })(SearchBar);
export default connect(
  mapStateToProps,
  { searchDiscs, fetchDiscs, changeListText }
)(searchBarFormWrapped);
