import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class CollectionForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <div className="invalid-feedback">{error}</div>;
    }
  }

  renderInput = ({ input, label, meta, inputType }) => {
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
          type={inputType}
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
          <div className="form-group col-md-12">
            <Field
              name="name"
              component={this.renderInput}
              label="Collection name"
              inputType="text"
            />
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
  if (!formValues.name) {
    errors.name = 'You must enter a name';
  }

  return errors;
};

export default reduxForm({ form: 'CollectionForm', validate })(CollectionForm);
