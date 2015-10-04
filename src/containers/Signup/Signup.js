import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import * as signupActions from 'redux/modules/signup';

@connect(
  state => ({
    user: state.auth.user,
    errors: state.signup.errors,
    signup_done: state.signup.signup_done
  }),
  dispatch => bindActionCreators(signupActions, dispatch)
)

export default class Signup extends Component {
  static propTypes = {
    user: PropTypes.object,
    errors: PropTypes.array,
    signup: PropTypes.func,
    signup_done: PropTypes.bool,
    cleanErrors: PropTypes.func,
    history: PropTypes.object
  }

  componentWillMount() {
    if (this.props.errors.length) {
      this.props.cleanErrors();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signup_done) {
      this.props.history.pushState(null, '/signup-done');
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = this.refs.email;
    this.props.signup(email.value);
  }

  render() {
    const {user, errors} = this.props;
    let errorMessages;

    if (errors.length) {
      const errorList = errors.map((error, index) => {
        return (
          <p key={index}>{error}</p>
        );
      });

      errorMessages = (<div className="alert alert-danger" role="alert">{errorList}</div>);
    }

    return (
      <div className="container">
        <DocumentMeta title="Signup"/>
        <h1>Signup</h1>

        {errorMessages}

        {!user &&
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
