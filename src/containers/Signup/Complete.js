import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import DocumentMeta from 'react-document-meta';
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
    // I do not know javascript at all
    // Why I need self in an arrow function?
    const self = this;

    return this.props.complete(data).then(() => {
      const errors = self.props.completeSignupErrors;

      if (Object.keys(errors).length) {
        return Promise.reject(errors);
      }

      // do something on success
      self.props.initialize('signupComplete', {});
      self.props.history.pushState(null, '/groups');
      return Promise.resolve({});
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <DocumentMeta title="Signup Complete"/>
            <h1>Finaliza el registro</h1>

            <CompleteSignupForm
              onSubmit={::this.handleSubmit}
              initialValues={{token: this.props.params.token}}
            />
          </div>
        </div>
      </div>
    );
  }
}
