import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import * as signupActions from 'redux/modules/signup';

@connect(
  state => ({
    signup_done: state.signup.signup_done
  }),
  dispatch => bindActionCreators(signupActions, dispatch)
)

export default class Signup extends Component {
  static propTypes = {
    signup_done: PropTypes.bool,
    history: PropTypes.object
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.signup_done) {
      this.props.history.pushState(null, '/signup');
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
