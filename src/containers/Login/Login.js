import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import LoginForm from 'components/forms/Login';
import Button from 'components/Button';

import styles from '../../styles/layouts/index.scss';

class Login extends Component {
  static propTypes = {
    submitting: PropTypes.bool,
  };


  constructor(props) {
    super(props);
    this.onClickLogin = this._onClickLogin.bind(this);
  }

  static layoutCentered = true;

  _onClickLogin() {
    this.refs.login_form.submit();
  }

  render() {
    const { submitting } = this.props;

    return (
      <div className={styles.layoutCentered}>
        <div className={styles.layoutCentered__body}>
          <form>
            <LoginForm ref="login_form" />

            <Button
              primary
              processing={submitting}
              onClick={this.onClickLogin}
              type="submit"
            >Acceder</Button>
          </form>
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

export default connect(mapStateToProps)(Login);
