import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';

import { load as loadInvitations } from 'redux/modules/invitations/list';
import Invitations from './Invitations';
import List from './List';

class GroupMembers extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    memberships: PropTypes.array.isRequired,
  }

  render() {
    const { users, user, group, memberships } = this.props;

    return (
      <div>
        <Helmet title={`Miembros de ${group.name}`}/>

        <h3>Miembros</h3>
        <List group={group} users={users} memberships={memberships} />

        <Invitations group={group} user={user} />
      </div>
    );
  }
}

const asyncConnectProps = [{
  deferred: true,
  promise: ({ store: { dispatch }, params: { id } }) => {
    return dispatch(loadInvitations(id));
  },
}];

export default asyncConnect(asyncConnectProps)(GroupMembers);
