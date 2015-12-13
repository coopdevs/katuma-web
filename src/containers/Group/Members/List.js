import React, {Component, PropTypes} from 'react';

import Item from './Item';

export default class GroupMembersList extends Component {
  static propTypes = {
    memberships: PropTypes.object,
    users: PropTypes.object,
  }

  render() {
    const { memberships, users } = this.props;
    const memberList = memberships.entities.map((member) => {
      const user = users.byID[member.user_id];

      if (!user) return null;

      const memberItem = {
        ...user,
        role: member.role,
        member_id: member.id,
      };

      return (<li key={memberItem.id}><Item member={memberItem} /></li>);
    });

    return (<ul>{memberList}</ul>);
  }
}
