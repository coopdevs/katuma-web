import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';

import BulkInvitationsForm from 'components/forms/invitations/Bulk';
import { send as sendBulk } from 'redux/modules/invitations/bulk';
import { send } from 'redux/modules/invitations/list';
import { isRole } from 'helpers/entities/member';

const mapStateToProps = (state) => ({
  bulkErrors: state.bulkInvitationsReducer.bulkErrors,
  invitationStatusByID: state.invitationsReducer.invitationStatusByID,
});

const mapDispatchToProps = { initialize, send, sendBulk };

@connect(mapStateToProps, mapDispatchToProps)
export default class GroupMembersInvitations extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    invitations: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    invitationStatusByID: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    sendBulk: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
    bulkErrors: PropTypes.object,
  }

  sendInvitations(data) {
    const self = this;
    const dataWithGroupId = {
      ...data,
      group_id: this.props.group.id,
    };

    return this.props.sendBulk(dataWithGroupId).then(() => {
      const errors = this.props.bulkErrors;

      if (Object.keys(errors).length) {
        return Promise.reject(errors);
      }

      self.props.initialize('bulkInvitations', {emails: ''});
      return Promise.resolve({});
    });
  }

  resendInvitation(id, email, groupId) {
    return this.props.send({
      id,
      email,
      groupId,
    });
  }

  render() {
    const {
      currentUser,
      invitations,
      invitationStatusByID,
      group,
    } = this.props;
    const invitationsByGroup = invitations.byGroupID[group.id];
    const isAdmin = isRole(currentUser, 'admin');

    const invitationsList = invitationsByGroup.map((invitation) => {
      const invitationState = invitationStatusByID[invitation.id];
      const label = invitationState.sending ? 'Enviando...' : 'Reenviar';

      return (<li key={invitation.id}>
              {`${invitation.email} - `}

        {isAdmin && !invitationState.sent &&
         <button
          className="btn btn-default btn-xs"
          disabled={invitationState.sending}
          onClick={this.resendInvitation.bind(this, invitation.id, invitation.email, group.id)}
         >
          {label}
         </button>
        }
        {isAdmin && invitationState.sent &&
         <i style={{color: 'green'}} className="fa fa-check"></i>
        }
      </li>);
    });

    return (
      <div>
        <h3>Invitaciones</h3>

        {isAdmin && <BulkInvitationsForm onSubmit={this.sendInvitations.bind(this)} />}

        <ul>{invitationsList}</ul>
      </div>
    );
  }
}
