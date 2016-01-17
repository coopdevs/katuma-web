import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import Helmet from 'react-helmet';

import * as signupCompleteActions from 'redux/modules/signup/complete';
import CompleteSignupForm from 'components/forms/signup/Complete';

@connect(
  state => ({
    validSignup: state.signupCompleteReducer.validSignup,
    completeSignupErrors: state.signupCompleteReducer.completeSignupErrors
  }),
  {initialize, complete: signupCompleteActions.complete})
export default class Complete extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    complete: PropTypes.func.isRequired,
    params: PropTypes.object,
    completeSignupErrors: PropTypes.object,
    validSignup: PropTypes.bool,
    history: PropTypes.object,
    token: PropTypes.string
  }

  static onEnter(nextState, replaceState, cb) {
    const context = this.context;
    const token = nextState.params.token;

    function goSignup() {
      replaceState(null, '/signup');
    }

    function signupOrCreate() {
      const {signupCompleteReducer: {validSignup}} = context.getState();

      if (!validSignup) {
        goSignup();
      }

      cb();
    }

    if (token) {
      context.dispatch(signupCompleteActions.checkSignup(token))
        .then(signupOrCreate);
    } else {
      goSignup();
      cb();
    }
  }

  handleSubmit(data) {
    return this.props.complete(this.props.params.token, data).then(() => {
      const errors = this.props.completeSignupErrors;

      if (Object.keys(errors).length) {
        return Promise.reject(errors);
      }

      // do something on success
      window.location = '/onboarding';
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Helmet title="Signup Complete"/>
            <h1>Finaliza el registro</h1>

            <CompleteSignupForm
              onSubmit={this.handleSubmit.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}
