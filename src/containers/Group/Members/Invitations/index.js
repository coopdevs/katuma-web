import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import { send as sendBulkInvitations } from 'redux/modules/invitations/bulk';
import BulkInvitationsForm, { BULK_INVITATIONS_FORM }from 'components/forms/invitations/Bulk';
import { send } from 'redux/modules/invitations/list';
import { isRole } from 'presenters/member';
import Button from 'components/Button';
import List from './List';

class Invitations extends Component {
  static propTypes = {
    invitations: PropTypes.array.isRequired,
    group: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    send: PropTypes.func.isRequired,
    sendBulk: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.onClickSendInvitations = this._onClickSendInvitations.bind(this);
    this.onSubmitSendBulk = this._onSubmitSendBulk.bind(this);
    this.onResendInvitation = this._onResendInvitation.bind(this);
  }

  /**
   * Send bulk invitations
   */
  _onClickSendInvitations() {
    this.refs.bulk_invitations_form.submit();
  }

  /**
   * Re-send invitation
   *
   * @param {Object} data
   */
  _onResendInvitation(data) {
    return this.props.send(data);
  }

  /**
   * Send bulk invitations
   *
   * @param {Object} fields
   */
  _onSubmitSendBulk(fields) {
    const { group: { id }, sendBulk } = this.props;
    const data = {...fields, group_id: id };

    return sendBulk(data);
  }

  /**
   * Render send bulk invitations form.
   */
  renderSendInvitationsForm() {
    const { user, submitting, group } = this.props;
    const isAdmin = isRole(user, 'admin');

    if (!isAdmin) return null;

    return (
      <div>
        <BulkInvitationsForm
          group={group}
          ref="bulk_invitations_form"
          onSubmit={this.onSubmitSendBulk}
        />
        <Button
          type="submit"
          primary
          processing={submitting}
          onClick={this.onClickSendInvitations}
        >
          Enviar Invitaciones
        </Button>
      </div>
    );
  }

  render() {
    const { user, invitations, group } = this.props;
    const isAdmin = isRole(user, 'admin');

    if (!invitations.length && !isAdmin) return null;

    return (
      <div>
        <h3>Invitaciones</h3>
        {this.renderSendInvitationsForm()}

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

const mapStateToProps = (state, ownProps) => {
  const { invitationsReducer, form: allForms } = state;
  const { group: { id } } = ownProps;
  const newState = {
    invitations: invitationsReducer.invitations.byGroupId[id] || [],
  };

  const form = allForms[BULK_INVITATIONS_FORM];

  if (!form) return newState;

  return {
    ...newState,
    submitting: form.submitting,
  };
};

export default connect(
  mapStateToProps,
  { send, sendBulk: sendBulkInvitations }
)(Invitations);
