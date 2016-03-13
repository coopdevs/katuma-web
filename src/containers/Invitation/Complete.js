import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import Helmet from 'react-helmet';
import * as invitationCompleteActions from 'redux/modules/invitations/complete';
import CompleteSignupForm from 'components/forms/signup/Complete';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: (options) => {
    const {
      store: { dispatch },
      params: { token },
    } = options;

    return dispatch(invitationCompleteActions.checkInvitation(token));
  },
}])
@connect(
  state => ({
    validInvitation: state.completeInvitationReducer.validInvitation,
    user: state.auth.user,
    completeInvitationErrors: state.completeInvitationReducer.completeInvitationErrors
  }),
  {initialize, complete: invitationCompleteActions.complete})
export default class InvitationComplete extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    user: PropTypes.object,
    complete: PropTypes.func.isRequired,
    params: PropTypes.object,
    completeInvitationErrors: PropTypes.object,
    validInvitation: PropTypes.bool,
    history: PropTypes.object,
    token: PropTypes.string
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    const { validInvitation, user } = this.props;

    if (!validInvitation || user) {
      this.context.router.replace('/');
    }
  }

  handleSubmit(data) {
    return this.props.complete(this.props.params.token, data).then(() => {
      const errors = this.props.completeInvitationErrors;

      if (Object.keys(errors).length) {
        return Promise.reject(errors);
      }

      this.context.router.push('/groups');
      return Promise.resolve({});
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Helmet title="Complete your registration"/>
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
