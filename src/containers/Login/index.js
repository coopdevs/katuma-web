import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { login as loginAction } from 'redux/modules/auth';
import LoginForm from 'components/forms/Login';
import Button from 'components/Button';

import styles from '../../styles/layouts/index.scss';

class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
  };


  constructor(props) {
    super(props);

    this.onLoginSubmit = this._onLoginSubmit.bind(this);
    this.onClickLogin = this._onClickLogin.bind(this);
  }

  static layoutCentered = true;

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

  _onClickLogin() {
    this.refs.login_form.submit();
  }

  render() {
    const { submitting } = this.props;

    return (
      <div className={styles.layoutCentered}>
        <div className={styles.layoutCentered__body}>
          <LoginForm
            ref="login_form"
            onSubmit={this.onLoginSubmit}
          />

          <Button
            primary
            processing={submitting}
            onClick={this.onClickLogin}
            type="submit"
          >
            Acceder
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { form: { login } } = state;

  if (!login) return {};

  return { submitting: login.submitting };
};

export default connect(mapStateToProps, { login: loginAction })(Login);
