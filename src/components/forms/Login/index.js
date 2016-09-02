import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';

import { login } from 'redux/modules/auth';
import Input from 'components/Input';
import LoginFooter from './Footer';

class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onClickSignup: PropTypes.func,
  }

  render() {
    return (
      <div>
        <div>
          <Field
            name="login"
            component={Input}
            placeholder="Introduce tu email o login"
            label="Email"
            type="text"
            ref="login"
            errorsAlways
            setInitialFocus
          />
          <Field
            name="password"
            component={Input}
            placeholder="Introduce tu contraseña"
            label="Password"
            type="password"
          />
        </div>
        <LoginFooter
          onClickSignup={this.props.onClickSignup}
        />
      </div>
    );
  }
}

/**
 * Submit login form
 *
 * @param {Object} fields
 * @param {Function} dispatch
 */
const onSubmit = (fields, dispatch) => {
  return dispatch(login(fields)).catch(() => {
    // On /login endpoint we return a 401
    // header response. No real error for
    // login field. But in this case we force error
    throw new SubmissionError({
      login: 'Email o contraseña son incorrectos'
    });
  });
};

export default reduxForm({
  form: 'login',
  persistentSubmitErrors: true,
  onSubmit,
})(LoginForm);
