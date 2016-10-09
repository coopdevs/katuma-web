import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

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
    submitting: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.onClickSendInvitations = this._onClickSendInvitations.bind(this);
    this.onResendInvitation = this._onResendInvitation.bind(this);
  }

  /**
   * Send bulk invitations
   */
  _onClickSendInvitations() {
    this.refs.bulk_invitations_form.submit();
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

  /**
   * Render send bulk invitations form.
   */
  renderSendInvitationsForm() {
    const { user, submitting, group } = this.props;
    const isAdmin = isRole(user, 'admin');

    if (!isAdmin) return null;

    return (
      <form>
        <BulkInvitationsForm group={group} ref="bulk_invitations_form" />
        <Button
          type="submit"
          primary
          processing={submitting}
          onClick={this.onClickSendInvitations}
        >Enviar Invitaciones</Button>
      </form>
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

export default connect(mapStateToProps, { send })(Invitations);
