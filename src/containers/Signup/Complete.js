import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';

import layoutCentered from 'components/HOC/LayoutCentered';

import SignupCompleteForm from 'components/forms/signup/Complete';

import styles from '../../styles/layouts/index.scss';
import { checkSignup, complete } from 'redux/modules/signup/complete';

class SignupComplete extends Component {
  static propTypes = {
    completeSignup: PropTypes.func.isRequired,
    validSignup: PropTypes.bool.isRequired,
    signupDone: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this._handleSubmit.bind(this);
  }

  componentWillMount() {
    const { validSignup, push } = this.props;

    if (validSignup) return;

    push('/signup');
  }

  componentWillReceiveProps(newProps) {
    const { signupDone: oldSignupDone, push } = this.props;
    const { signupDone } = newProps;

    if (oldSignupDone === signupDone) return;

    push('/onboarding');
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
          <SignupCompleteForm onSubmit={this.handleSubmit} />
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
  connect(mapStateToProps, { completeSignup: complete, push: routeActions.push })
)(SignupComplete);
