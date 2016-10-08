import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import SignupCreateForm from 'components/forms/Signup/Create';
import Button from 'components/Button';

import styles from '../../styles/layouts/index.scss';

class SignupCreate extends Component {
  static propTypes = {
    submitting: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.onClickSignup = this._onClickSignup.bind(this);
  }

  static layoutCentered = true;

  _onClickSignup() {
    this.refs.signup_form.submit();
  }

  render() {
    const { submitting } = this.props;

    return (
      <div className={styles.layoutCentered}>
        <div className={styles.layoutCentered__body}>
          <form>
            <SignupCreateForm ref="signup_form" />

            <Button
              primary
              processing={submitting}
              onClick={this.onClickSignup}
              type="submit"
            >Crear cuenta</Button>
          </form>
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

export default connect(mapStateToProps)(SignupCreate);
