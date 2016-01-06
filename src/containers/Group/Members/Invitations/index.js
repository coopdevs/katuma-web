import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';

import BulkInvitationsForm from 'components/forms/invitations/Bulk';
import { send } from 'redux/modules/invitations/bulk';
import { isRole } from 'helpers/entities/member';

const mapStateToProps = (state) => ({
  bulkErrors: state.bulkInvitationsReducer.bulkErrors,
});

const mapDispatchToProps = { initialize, send };

@connect(mapStateToProps, mapDispatchToProps)
export default class GroupMembersInvitations extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    invitations: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    send: PropTypes.func.isRequired,
    bulkErrors: PropTypes.object,
  }

  sendInvitations(data) {
    const self = this;
    const dataWithGroupId = {
      ...data,
      group_id: this.props.group.id,
    };

    return this.props.send(dataWithGroupId).then(() => {
      const errors = this.props.bulkErrors;

      if (Object.keys(errors).length) {
        return Promise.reject(errors);
      }

      self.props.initialize('bulkInvitations', {emails: ''});
      return Promise.resolve({});
    });
  }

  resendInvitation(invitationId) {
    console.log(invitationId);
  }

  render() {
    const { currentUser, invitations, group } = this.props;
    const invitationsByGroup = invitations.byGroupID[group.id];
    const isAdmin = isRole(currentUser, 'admin');

    const invitationsList = invitationsByGroup.map((invitation) => {
      return (<li key={invitation.id}>
              {`${invitation.email} - `}

        {isAdmin &&
         <button
          className="btn btn-default btn-xs"
         onClick={this.resendInvitation.bind(this, invitation.id)}
         >
          Reenviar
         </button>
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
