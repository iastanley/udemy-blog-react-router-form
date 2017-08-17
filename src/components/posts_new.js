import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    // use touched if you want error message to show up BEFORE submit
    // use submitFailed if you want error message to show up only AFTER submit
    const { label, input, meta: { submitFailed, error } } = field;
    // ^This syntax is equivalent to:
    // const { submitFailed, error } = field.meta;
    // const { label, input } = field;

    const className = `form-group ${submitFailed && error ? 'has-danger':''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input
          className="form-control"
          type="text"
          {...input}
        />
        <div className="text-help">{submitFailed ? error : ''}</div>
      </div>
    );
  }
  // this is where we will handle submitting data to server
  onSubmit(values) {
    // use a callback to redirect AFTER network request completes
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  // TODO - figure out later how to make the Post content a textarea not an input
  render() {
    // prop from redux-form
    // handleSubmit is a higher order function from redux-form
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}/>
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}/>
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}/>
        <button type="submit" className="btn btn-primary">Save</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  // values argument is object containing values from form
  //must return errors object
  const errors = {};

  // validate inputs
  if (!values.title) {
    errors.title = 'Enter a title';
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content';
  }
  // return errors object
  // if errors object is empty redux-form considers input valid
  // if errors object has any properties input is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm' // name for this form - needs to be unique
})(
  // passing reduxForm a connected component
  connect(null, { createPost })(PostsNew)
);
