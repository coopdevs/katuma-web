import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

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
        <form onSubmit={this.props.handleSubmit}>
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
        </form>
        <LoginFooter
          onClickSignup={this.props.onClickSignup}
        />
      </div>
    );
  }
}

export default reduxForm({ form: 'login' })(LoginForm);
