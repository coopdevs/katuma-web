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

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    const { validSignup } = this.props;

    if (!validSignup) {
      this.context.router.replace('/signup');
    }
  }

  static reduxAsyncConnect(params, store) {
    const { dispatch } = store;
    const { token } = params;

    return dispatch(signupCompleteActions.checkSignup(token));
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
