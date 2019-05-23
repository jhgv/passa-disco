import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class DiscForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <div className="invalid-feedback">{error}</div>;
    }
  }

  renderInput = ({ input, label, meta }) => {
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
          type="text"
        />
        {this.renderError(meta)}
      </div>
    );
  };

  adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

  renderFileInput = ({
    input: { value: omitValue, onChange, onBlur, ...inputProps },
    label,
    ...props
  }) => (
    <div>
      <label>{label}</label>
      <input
        onChange={this.adaptFileEventToValue(onChange)}
        onBlur={this.adaptFileEventToValue(onBlur)}
        type="file"
        accept=".jpg, .png, .jpeg"
        {...inputProps}
        {...props}
      />
    </div>
  );

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
              name="cover"
              label="Cover"
              component={this.renderFileInput}
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
  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.artist) {
    errors.artist = 'You must enter an artist';
  }

  if (!formValues.recorder) {
    errors.recorder = 'You must enter a recorder company';
  }

  return errors;
};

export default reduxForm({ form: 'discForm', validate })(DiscForm);
