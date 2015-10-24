import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import * as signupCompleteActions from 'redux/modules/signup/complete';

@connect(
  state => ({
    validSignup: state.signupCompleteReducer.validSignup
  }),
  dispatch => bindActionCreators(signupCompleteActions, dispatch)
)
export default class Complete extends Component {
  static propTypes = {
    params: PropTypes.object,
    validSignup: PropTypes.bool,
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

  render() {
    const {token} = this.props.params;

    return (
      <div className="container">
        <DocumentMeta title="Signup Complete"/>
        <h1>Signup Complete</h1>
        <div className="alert" role="alert">
          <p>this is the token {token}</p>
        </div>

      </div>
    );
  }
}
