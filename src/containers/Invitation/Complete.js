import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import Helmet from 'react-helmet';
import * as invitationCompleteActions from 'redux/modules/invitations/complete';
import CompleteSignupForm from 'components/forms/signup/Complete';

@connect(
  state => ({
    validInvitation: state.completeInvitationReducer.validInvitation,
    completeInvitationErrors: state.completeInvitationReducer.completeInvitationErrors
  }),
  {initialize, complete: invitationCompleteActions.complete})
export default class InvitationComplete extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    complete: PropTypes.func.isRequired,
    params: PropTypes.object,
    completeInvitationErrors: PropTypes.object,
    validInvitation: PropTypes.bool,
    history: PropTypes.object,
    token: PropTypes.string
  }

  static onEnter(nextState, replaceState, cb) {
    const context = this.context;
    const token = nextState.params.token;

    function goHome() {
      replaceState(null, '/');
    }

    function signupOrHome() {
      const {completeInvitationReducer: {validInvitation}} = context.getState();

      if (!validInvitation) {
        goHome();
      }

      cb();
    }

    if (token) {
      context.dispatch(invitationCompleteActions.checkInvitation(token))
        .then(signupOrHome);
    } else {
      goSignup();
      cb();
    }
  }

  handleSubmit(data) {
    return this.props.complete(this.props.params.token, data).then(() => {
      const errors = this.props.completeInvitationErrors;

      if (Object.keys(errors).length) {
        return Promise.reject(errors);
      }

      this.props.history.pushState(null, '/groups');
      return Promise.resolve({});
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Helmet title="Complete invitation"/>
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
