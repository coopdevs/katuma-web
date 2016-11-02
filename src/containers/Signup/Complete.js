import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { asyncConnect } from 'redux-async-connect';

import layoutCentered from 'components/HOC/LayoutCentered';

import ProfileCompleteForm from 'components/forms/Profile/Complete';

import styles from '../../styles/layouts/index.scss';
import { checkSignup, complete } from 'redux/modules/signup/complete';
import { getNextOnboardingUrl } from '../Onboarding/services';

class SignupComplete extends Component {
  static propTypes = {
    completeSignup: PropTypes.func.isRequired,
    validSignup: PropTypes.bool.isRequired,
    signupDone: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this._handleSubmit.bind(this);
  }

  componentWillMount() {
    const { validSignup } = this.props;

    if (validSignup) return;

    browserHistory.push('/signup');
  }

  componentWillReceiveProps(newProps) {
    const { signupDone: oldSignupDone } = this.props;
    const { signupDone } = newProps;

    if (oldSignupDone === signupDone) return;

    browserHistory.push(getNextOnboardingUrl());
  }

  /**
  * Submit signup create form
  *
  * @param {Object} fields
  */
  _handleSubmit(fields) {
    // do something on success
    /* window.location = '/onboarding';*/
    const { params: { token }, completeSignup } = this.props;
    return completeSignup(token, fields);
  }

  render() {
    return (
      <div className={styles.layoutCentered}>
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

const asyncConnectProps = [{
  promise: (options) => {
    const { store: { dispatch }, params: { token } } = options;
    return dispatch(checkSignup(token));
  },
}];

const mapStateToProps = ({ signupCompleteReducer: { validSignup, signupDone }}) => ({
  validSignup,
  signupDone,
});

export default compose(
  layoutCentered,
  asyncConnect(asyncConnectProps),
  connect(mapStateToProps, { completeSignup: complete })
)(SignupComplete);
