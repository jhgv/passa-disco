import React from 'react';
import { connect } from 'react-redux';
import DiscForm from './DiscForm';

class DiscCreate extends React.Component {
  onSubmit = formValues => {
    // TODO: implement action bellow
    // this.props.createDisc(formValues);
    console.log(formValues);
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

export default connect(null)(DiscCreate);
