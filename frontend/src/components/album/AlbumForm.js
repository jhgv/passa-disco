import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class AlbumForm extends React.Component {
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
            <Field
              name="name"
              component={this.renderInput}
              label="Album name"
            />
          </div>
          <div className="form-group col-md-6">
            <Field name="artist" component={this.renderInput} label="Artist" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <Field name="genre" component={this.renderInput} label="Genre" />
          </div>
          <div className="form-group col-md-2">
            <Field
              name="year"
              component={this.renderInput}
              label="Year"
              inputType="number"
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

export default reduxForm({ form: 'AlbumForm', validate })(AlbumForm);
