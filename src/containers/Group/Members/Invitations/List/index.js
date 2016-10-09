import React, { PropTypes } from 'react';

import Invitation from '../Item';

const List = ({ user, invitations, group, onResendInvitation }) => (
  <ul>
    {invitations.map((invitation) => (
      <Invitation
        key={invitation.id}
        invitation={invitation}
        user={user}
        group={group}
        onResendInvitation={onResendInvitation}
      />
    ))}
  </ul>
);

List.propTypes = {
  onResendInvitation: PropTypes.func.isRequired,
  invitations: PropTypes.array.isRequired,
  group: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default List;
