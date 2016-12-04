import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, stopSubmit, reset } from 'redux-form';

import { resetSignup } from 'redux/modules/signup/create';
import Input from 'components/Input';
import MessagePane from 'components/MessagePane';
import SignupFooter from './Footer';

const SIGNUP_CREATE_FORM = 'signupCreate';

class SignupCreate extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    stopSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    resetSignup: PropTypes.func.isRequired,
    onClickLogin: PropTypes.func,
    signupDone: PropTypes.bool,
    errors: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.onDissmis = this._onDissmis.bind(this);
    this.state = { signupDone: false };
  }

  componentWillReceiveProps(newProps) {
    const { resetForm, signupDone: oldSignupDone } = this.props;
    const { signupDone, errors } = newProps;

    this.checkErrors(errors);

    if (oldSignupDone === signupDone) return;

    resetForm(SIGNUP_CREATE_FORM);
    this.setState({ signupDone });
  }

  componentWillUnmount() {
    this.props.resetSignup();
  }

  /**
   * When api request has errors show it
   * on the form.
   *
   * @param {Object} errors.
   */
  checkErrors(errors) {
    if (!errors) return;

    this.props.stopSubmit(SIGNUP_CREATE_FORM, errors);
  }

  _onDissmis() {
    this.setState({ signupDone: false });
  }

  render() {
    const { signupDone } = this.state;

    return (
      <div>
        <MessagePane isVisible={signupDone} onDissmis={this.onDissmis}>
          <h4>Email guardado!</h4>
          <p>Te hemos enviado un email. Por favor revisa en la bandeja de correo no deseado.</p>
          <p>Abre el email y clicka en el enlace. Asi podras terminar el registro</p>
        </MessagePane>
        <div>
          <Field
            name="email"
            component={Input}
            placeholder="Introduce tu email"
            label="Email"
            type="text"
            errorsAlways
            setInitialFocus
          />
        </div>

        <SignupFooter
          onClickLogin={this.props.onClickLogin}
        />
      </div>
    );
  }
}

const reduxFormProps = {
  form: SIGNUP_CREATE_FORM,
  persistentSubmitErrors: true,
};

const mapStateToProps = (state) => ({
  signupDone: state.signupCreateReducer.signupDone,
  errors: state.signupCreateReducer.errors,
});

export default compose(
  reduxForm(reduxFormProps),
  connect(mapStateToProps, { resetSignup, stopSubmit, resetForm: reset })
)(SignupCreate);
