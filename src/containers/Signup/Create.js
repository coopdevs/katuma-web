import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { signup as signupAction } from 'redux/modules/signup/create';
import SignupCreateForm from 'components/forms/Signup/Create';
import Button from 'components/Button';
import Header from 'containers/Header';

import styles from '../../styles/layouts/index.scss';

class SignupCreate extends Component {
  static propTypes = {
    signup: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.onSignupSubmit = this._onSignupSubmit.bind(this);
    this.onClickSignup = this._onClickSignup.bind(this);
  }

  static layoutCentered = true;

  _onClickSignup() {
    this.refs.signup_form.submit();
  }

  _onSignupSubmit(fields) {
    return this.props.signup(fields);
  }

  render() {
    const { submitting } = this.props;

    return (
      <div className={styles.layoutCentered}>
        <Header hideSignupButton />
        <div className={styles.layoutCentered__body}>
          <SignupCreateForm
            ref="signup_form"
            onSubmit={this.onSignupSubmit}
          />

          <Button
            primary
            processing={submitting}
            onClick={this.onClickSignup}
            type="submit"
          >
            Crear cuenta
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { form: { signupCreate } } = state;

  if (!signupCreate) return {};

  return { submitting: signupCreate.submitting };
};

export default connect(mapStateToProps, { signup: signupAction })(SignupCreate);
