import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { SubmissionError } from 'redux-form';

import { MODAL_TYPES } from '../constants';
import { login as loginAction } from 'redux/modules/auth';
import { signup as signupAction } from 'redux/modules/signup/create';
import LoginForm from 'components/forms/Login';
import SignupCreateForm from 'components/forms/Signup/Create';
import Button from 'components/Button';

class UserAccessModal extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    user: PropTypes.object,
    showModal: PropTypes.bool.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    modalType: PropTypes.string,
    submittingLogin: PropTypes.bool,
    submittingSignup: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    const { modalType } = props;

    this.state = {
      modalType: modalType || MODAL_TYPES.login,
    };

    this.onClickLogin = this._onClickLogin.bind(this);
    this.onLoginSubmit = this._onLoginSubmit.bind(this);
    this.onClickSignup = this._onClickSignup.bind(this);
    this.onSignupSubmit = this._onSignupSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { modalType: oldModalType } = this.props;
    const { modalType } = newProps;

    if (oldModalType === modalType) return;

    this.setState({ modalType });
  }

  _onClickLogin() {
    this.refs.login_form.submit();
  }

  _onLoginSubmit(fields) {
    return this.props.login(fields).catch(() => {
      // On /login endpoint we return a 401
      // header response. No real error for
      // login field. But in this case we force error
      throw new SubmissionError({
        login: 'Email o contraseña son incorrectos'
      });
    });
  }

  _onSignupSubmit(fields) {
    return this.props.signup(fields);
  }

  _onClickSignup() {
    this.refs.signup_form.submit();
  }

  /**
   * Set now modal type
   *
   * @param {String} modalType
   */
  changeModalType(modalType) {
    this.setState({ modalType });
  }

  /**
   * Render form button
   */
  renderButton() {
    const { submittingLogin, submittingSignup } = this.props;
    const { modalType } = this.state;
    const isLogin = modalType === MODAL_TYPES.login;
    const action = isLogin ? this.onClickLogin : this.onClickSignup;
    const text = isLogin ? 'Acceder' : 'Crear cuenta';
    const submitting = isLogin ? submittingLogin : submittingSignup;

    return (
      <Button
        primary
        processing={!!submitting}
        onClick={action}
        type="submit"
      >{text}</Button>
    );
  }

  /**
   * Render login form
   *
   * @return {ReactComponent}
   */
  renderLoginForm() {
    const { modalType } = this.state;

    if (modalType !== MODAL_TYPES.login) return null;

    return (
      <div>
        <LoginForm
          ref="login_form"
          onClickSignup={this.changeModalType.bind(this, MODAL_TYPES.signup)}
          onSubmit={this.onLoginSubmit}
        />
      </div>
    );
  }

  /**
   * Render signup form
   *
   * @return {ReactComponent}
   */
  renderSignupForm() {
    const { modalType } = this.state;

    if (modalType !== MODAL_TYPES.signup) return null;

    return (
      <div>
        <SignupCreateForm
          ref="signup_form"
          onSubmit={this.onSignupSubmit}
          onClickLogin={this.changeModalType.bind(this, MODAL_TYPES.login)}
        />
      </div>
    );
  }

  render() {
    const { showModal, onCloseModal } = this.props;
    const { modalType } = this.state;
    const isLogin = modalType === MODAL_TYPES.login;
    const title = isLogin ? 'Accede a tu cuenta' : 'Crea una cuenta';

    return (
      <Modal show={showModal} onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderLoginForm()}
          {this.renderSignupForm()}
        </Modal.Body>
        <Modal.Footer>{this.renderButton()}</Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    form: { login, signupCreate },
    auth: { user },
  } = state;

  let newState = { user };

  if (login) {
    newState = {
      ...newState,
      submittingLogin: login.submitting,
    };
  }

  if (signupCreate) {
    newState = {
      ...newState,
      submittingSignup: signupCreate.submitting,
    };
  }

  return newState;
};

export default connect(
  mapStateToProps,
  { login: loginAction, signup: signupAction }
)(UserAccessModal);
