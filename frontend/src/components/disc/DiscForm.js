import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class DiscForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <div className="invalid-feedback">{error}</div>;
    }
  }

  renderInput = ({ input, label, meta, inputType = 'text' }) => {
    const typeProps =
      inputType !== 'number'
        ? { type: inputType }
        : { type: 'number', step: 'any' };

    const className = `form-control ${
      meta.error && meta.touched ? 'is-invalid' : ''
    }`;

    return (
      <div>
        <label>{label}</label>
        <input
          {...input}
          autoComplete="off"
          className={className}
          {...typeProps}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <Field name="title" component={this.renderInput} label="Title" />
          </div>
          <div className="form-group col-md-6">
            <Field name="artist" component={this.renderInput} label="Artist" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <Field
              name="recorder"
              component={this.renderInput}
              label="Recorder"
            />
          </div>
          <div className="form-group col-md-4">
            <Field
              name="price"
              component={this.renderInput}
              label="Price"
              inputType="number"
            />
          </div>
          <div className="form-group col-md-4">
            <Field name="cover" component={this.renderInput} label="Cover" />
          </div>
        </div>
        <Link to="/" className="btn btn-link mr-3">
          Back
        </Link>
        <button className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.artist) {
    errors.artist = 'You must enter an artist';
  }

  if (!formValues.recorder) {
    errors.recorder = 'You must enter a recorder company';
  }

  if (!formValues.price) {
    errors.price = 'You must enter a price for the disc';
  }

  return errors;
};

export default reduxForm({ form: 'discForm', validate })(DiscForm);
