import React, {Component, PropTypes} from 'react';
import {connectReduxForm} from 'redux-form';

import { COMPLETE_SIGNUP_FORM_FIELDS } from 'redux/modules/signup/complete';

function asyncValidate(data) {
  console.log('data', data);
  return Promise.resolve({});
}

@connectReduxForm({
  form: 'signupComplete',
  fields: Object.keys(COMPLETE_SIGNUP_FORM_FIELDS),
  asyncValidate
})
export default class CompleteSignupForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const {handleSubmit, fields} = this.props;

    const renderInput = (field) => {
      const {label, type, placeholder} = COMPLETE_SIGNUP_FORM_FIELDS[field.name];

      return (
        <div className={'form-group' + (field.error ? ' has-error' : '')}>

          <label htmlFor={field.name}>{label}</label>
          <div>
            <input
              id={field.name}
              type={type}
              className="form-control"
              placeholder={placeholder}
              {...field}/>

            {field.error && <div className="text-danger">{field.error}</div>}
          </div>
        </div>
      );
    };

    const inputs = Object.keys(fields).map((key) => renderInput(fields[key]));

    return (
      <div>
        <form onSubmit={handleSubmit}>

          {inputs}

          <div className="form-group">
            <button className="btn btn-success" onClick={handleSubmit}>
              Finalizar registro
            </button>
          </div>
        </form>

      </div>
    );
  }
}
