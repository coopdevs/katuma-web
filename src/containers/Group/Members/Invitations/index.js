import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import BulkInvitationsForm from 'components/forms/invitations/Bulk';
import { send as sendBulk } from 'redux/modules/invitations/bulk';
import { send } from 'redux/modules/invitations/list';
import { isRole } from 'presenters/member';

import List from './List';

class Invitations extends Component {
  static propTypes = {
    invitations: PropTypes.array.isRequired,
    group: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    sendBulk: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.onSendInvitations = this._onSendInvitations.bind(this);
    this.onResendInvitation = this._onResendInvitation.bind(this);
  }

  /**
   * Send bulk invitations
   *
   * @param {Object} fields
   */
  _onSendInvitations(fields) {
    const { group: { id } } = this.props;
    const data = {...fields, group_id: id };

    return this.props.sendBulk(data);
  }

  /**
   * Send bulk invitations
   *
   * @param {Object} invitation
   * @param {Number} groupId
   */
  _onResendInvitation({ id, email }, groupId) {
    return this.props.send({ id, email, groupId });
  }

  render() {
    const { user, invitations, group } = this.props;
    const isAdmin = isRole(user, 'admin');

    if (!invitations.length && !isAdmin) return null;

    return (
      <div>
        <h3>Invitaciones</h3>

        {isAdmin &&
          <BulkInvitationsForm onSubmit={this.onSendInvitations} />
        }

        {invitations.length &&
          <List
            invitations={invitations}
            onResendInvitation={this.onResendInvitation}
            group={group}
            user={user}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ invitationsReducer }, { group: { id }}) => ({
  invitations: invitationsReducer.invitations.byGroupId[id] || [],
});

export default connect(mapStateToProps, { send, sendBulk })(Invitations);
