import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchDisc, updateDisc } from '../../actions';
import DiscForm from './DiscForm';

class DiscUpdate extends React.Component {
  componentDidMount() {
    this.props.fetchDisc(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.updateDisc(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.disc) {
      return <div>Loading disc...</div>;
    }
    return (
      <div>
        <DiscForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(
            this.props.disc,
            'title',
            'artist',
            'recorder',
            'cover'
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { disc: state.discs[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchDisc, updateDisc }
)(DiscUpdate);
