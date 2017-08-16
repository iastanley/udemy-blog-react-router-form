import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
  renderField(field) {
    const { touched, error } = field.meta;
    const className = `form-group ${touched && error ? 'has-danger':''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }
  // this is where we will handle submitting data to server
  onSubmit(values) {
    console.log(values);
  }

  // figure out later how to make the Post content a textarea not an input
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
})(PostsNew);
