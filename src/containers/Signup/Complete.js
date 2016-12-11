import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import layoutCentered from 'components/HOC/LayoutCentered';

import ProfileCompleteForm from 'components/forms/Profile/Complete';
import Header from 'containers/Header';

import styles from '../../styles/layouts/index.scss';
import { checkSignup, complete } from 'redux/modules/signup/complete';
import { getNextOnboardingUrl } from '../Onboarding/services';

class SignupComplete extends Component {
  static propTypes = {
    completeSignup: PropTypes.func.isRequired,
    signupDone: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this._handleSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { signupDone: oldSignupDone } = this.props;
    const { signupDone } = newProps;

    if (oldSignupDone === signupDone) return;

    browserHistory.push(getNextOnboardingUrl());
  }

  /**
   * On enter hook to check if signup is valid
   */
  static onEnter = (store) => (nextState, replace, cb) => {
    const { params: { token } } = nextState;
    const { signupCompleteReducer: { validSignup } } = store.getState();

    if (validSignup) {
      cb();
    } else {
      store
        .dispatch(checkSignup(token))
        .then(cb)
        .catch(() => {
          replace('/signup');
          cb();
        });
    }
  };

  /**
  * Submit signup create form
  *
  * @param {Object} fields
  */
  _handleSubmit(fields) {
    const { params: { token }, completeSignup } = this.props;
    return completeSignup(token, fields);
  }

  render() {
    return (
      <div className={styles.layoutCentered}>
        <Header hideSignupButton />
        <div className={styles.layoutCentered__body}>
          <ProfileCompleteForm
            onSubmit={this.handleSubmit}
            reducerKey="signupCompleteReducer"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ signupCompleteReducer: { signupDone }}) => ({
  signupDone,
});

export default compose(
  layoutCentered,
  connect(mapStateToProps, { completeSignup: complete })
)(SignupComplete);
