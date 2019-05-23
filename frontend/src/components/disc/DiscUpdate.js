import React from 'react';
import { connect } from 'react-redux';
import { fetchDisc } from '../../actions';

class DiscUpdate extends React.Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
  }

  render() {
    return <div>DiscUpdate</div>;
  }
}

export default connect(
  null,
  { fetchDisc }
)(DiscUpdate);
