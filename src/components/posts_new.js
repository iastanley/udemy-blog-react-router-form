import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { createPost } from '../actions';

// refactor to have use FIELDS config object
// also consider running a custom validation function
const FIELDS = {
  title: {
    type: 'input',
    label: 'Title',
    invalid: value => {
      if(!value) {
        return 'Enter a title';
      }
      if (value.length < 3) {
        return 'Title must be at least 3 characters';
      }
      return false;
    }
  },
  categories: {
    type: 'input',
    label: 'Categories',
    invalid: value => value ? '' : 'Enter some categories'
  },
  content: {
    type: 'textarea',
    label: 'Post Content',
    invalid: value => value ? '' : 'Enter some content'
  }
}


class PostsNew extends Component {
  renderField(field) {
    const fieldConfig = FIELDS[field.input.name];

    const { input, meta: { submitFailed, error } } = field;

    const className = `form-group ${submitFailed && error ? 'has-danger':''}`;

    return (
      <div className={className}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type
          className="form-control"
          type="text"
          {...input}
        />
        <div className="text-help">{submitFailed ? error : ''}</div>
      </div>
    );
  }

  onSubmit(values) {
    // use a callback to redirect AFTER network request completes
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      { _.keys(FIELDS).map(key => {
        return (
          <Field
            name={key}
            key={key}
            component={this.renderField}
          />
        );
      })}
        <button type="submit" className="btn btn-primary">Save</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  // lodash each() method takes (value,key) as callback args
  _.each(FIELDS, (config, field) => {
    if(config.invalid(values[field])) {
      errors[field] = config.invalid(values[field]);
    }
  });
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
