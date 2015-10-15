import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { logout, login } from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  dispatch => bindActionCreators({logout, login}, dispatch)
)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = this.refs.email;
    const password = this.refs.password;
    this.props.login(email.value, password.value);
    email.value = '';
    password.value = '';
  }

  render() {
    const {user} = this.props;
    return (
      <div className="container">
        <DocumentMeta title="React Redux Example: Login"/>
        <h1>Login</h1>
        {!user &&
        <div>
          <form className="login-form" onSubmit={::this.handleSubmit}>
            <div className="form-group">
              <input className="form-control" type="email" ref="email" placeholder="Enter your email"/>
            </div>
            <div className="form-group">
              <input className="form-control" type="password" ref="password" placeholder="Enter your password"/>
            </div>
            <button className="btn btn-success" onClick={::this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={this.props.logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
