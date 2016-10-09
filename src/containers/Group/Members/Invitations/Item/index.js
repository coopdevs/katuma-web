import React, { Component, PropTypes } from 'react';

import { isRole } from 'presenters/member';
import Button from 'components/Button';

class Invitation extends Component {
  static propTypes = {
    invitation: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    onResendInvitation: PropTypes.func.isRequired,
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

    onResendInvitation(invitation, group.id);
  }

  renderButton() {
    const { user } = this.props;

    if (!isRole(user, 'admin')) return null;

    return (
      <Button
        primary
        size="xs"
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

export default Invitation;
