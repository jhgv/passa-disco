import React from 'react';
import { connect } from 'react-redux';
import DiscForm from './DiscForm';
import { createDisc } from '../../actions';

class DiscCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createDisc(formValues);
  };

  render() {
    return (
      <div>
        <h2>Create Disc</h2>
        <DiscForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { createDisc }
)(DiscCreate);
