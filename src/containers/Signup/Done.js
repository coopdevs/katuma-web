import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import * as signupActions from 'redux/modules/signup/create';

@connect(
  state => ({
    signup_done: state.signupCreateReducer.signup_done
  }),
  dispatch => bindActionCreators(signupActions, dispatch)
)

export default class Done extends Component {
  static propTypes = {
    signup_done: PropTypes.bool,
    history: PropTypes.object
  }

  static onEnter(nextState, replaceState) {
    if (!nextState.signup_done) {
      replaceState(null, '/signup');
    }
  }

  render() {
    return (
      <div className="container">
        <DocumentMeta title="Signup Success"/>
        <h1>Signup Success</h1>
        <div className="alert alert-success" role="alert">
          <p>Signup success!</p>
          <p>We've sent you an email to finish sign up</p>
          <p>Please, review spam folder</p>
        </div>

      </div>
    );
  }
}
