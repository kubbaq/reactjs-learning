import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {createPost} from '../actions'

class PostNew extends Component {
  rederField (field) {
    const {meta: {touched, error}} = field
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className='form-control'
          type='text'
          {...field.input}
          />
        <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit (values) {
    this.props.createPost(values, () => {
      this.props.history.push('/')
    })
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label='Title'
          name='title'
          component={this.rederField} />
        <Field
          label='Categories'
          name='categories'
          component={this.rederField} />
        <Field
          label='Content'
          name='content'
          component={this.rederField} />
        <button type='submit' className='btn btn-primary'>Submit</button>
        <Link to='/' className='btn btn-danger'>Cancel</Link>
      </form>
    )
  }
}

const validate = (values) => {
  const errors = {}

// Validate the inputs from 'values'
  if (!values.title) {
    errors.title = 'Enter a title!'
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories!'
  }
  if (!values.content) {
    errors.content = 'Enter some content!'
  }

// if errors is empty, the from is fine to submit
// If errors has any properties redux form assumes that form is invalid
  return errors
}

export default reduxForm({
  validate,
  form: 'PostNewForm'
})(connect(null, {createPost})(PostNew))
