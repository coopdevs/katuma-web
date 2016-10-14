import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import { isRole } from 'presenters/member';
import Button from 'components/Button';
import Icon from 'components/Icon/';
import { GLYPHS } from 'components/Icon/glyphs';

class Invitation extends Component {
  static propTypes = {
    invitation: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    onResendInvitation: PropTypes.func.isRequired,
    sendingInvitationId: PropTypes.number,
    sentInvitations: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.onResendInvitation = this._onResendInvitation.bind(this);
  }

  /**
   * When user clicks on resent invitation
   */
  _onResendInvitation() {
    const { invitation, group, onResendInvitation } = this.props;

    onResendInvitation({ email: invitation.email, id: invitation.id, group_id: group.id });
  }

  renderButton() {
    const { user, invitation, sendingInvitationId, sentInvitations } = this.props;

    if (!isRole(user, 'admin')) return null;

    const processing = sendingInvitationId === invitation.id;

    if (_.contains(sentInvitations, invitation.id)) return (<Icon glyph={GLYPHS.check} />);

    return (
      <Button
        primary
        size="xs"
        processing={processing}
        onClick={this.onResendInvitation}
      >
        Reenviar
      </Button>
    );
  }

  render() {
    const { invitation } = this.props;

    return (
      <li>
        {`${invitation.email} - `}
        {this.renderButton()}
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  const { invitationsReducer: { sendingInvitationId, sentInvitations }} = state;

  return { sendingInvitationId, sentInvitations };
};

export default connect(mapStateToProps)(Invitation);
