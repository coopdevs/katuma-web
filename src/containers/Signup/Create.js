import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as signupActions from 'redux/modules/signup/create';

@connect(
  state => ({
    user: state.auth.user,
    errors: state.signupCreateReducer.errors,
    signupDone: state.signupCreateReducer.signupDone
  }),
  dispatch => bindActionCreators(signupActions, dispatch)
)

export default class Create extends Component {
  static propTypes = {
    user: PropTypes.object,
    errors: PropTypes.array,
    signup: PropTypes.func,
    signupDone: PropTypes.bool,
    cleanErrors: PropTypes.func,
    history: PropTypes.object
  }

  componentWillMount() {
    if (this.props.errors.length) {
      this.props.cleanErrors();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signupDone) {
      this.refs.email.value = '';
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = this.refs.email;
    this.props.signup(email.value);
  }

  render() {
    const {user, errors, signupDone} = this.props;
    let errorMessages;
    let successMessage;

    if (errors.length) {
      errorMessages = (
        <div className="alert alert-danger" role="alert">
          {errors[0]}
        </div>
      );
    }

    if (signupDone) {
      successMessage =  (
        <div className="alert alert-success" role="alert">
          <p>Signup success!</p>
          <p>We've sent you an email to finish sign up</p>
          <p>Please, review spam folder</p>
        </div>
      );
    }

    return (
      <div className="container">
        <Helmet title="Signup"/>
        <h1>Signup</h1>

        {successMessage}
        {errorMessages}

        {!user && !signupDone &&
        <div>
          <form onSubmit={::this.handleSubmit}>
            <div className="form-group">
              <input className="form-control" type="text" ref="email" placeholder="Enter your email"/>
            </div>
            <button className="btn btn-success" onClick={::this.handleSubmit}>
              Sign up
            </button>
          </form>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.first_name}.</p>
        </div>
        }
      </div>
    );
  }
}
