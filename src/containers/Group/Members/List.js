import React, {Component, PropTypes} from 'react';

import { getMember } from 'presenters/member';

import Item from './Item';

export default class GroupMembersList extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    memberships: PropTypes.array.isRequired,
    users: PropTypes.object.isRequired,
  }

  render() {
    const { memberships, users } = this.props;

    return (
      <ul>
        {memberships.map((membership) => {
          const member = getMember(users[membership.user_id], membership);

          if (!member) return null;

          return (
            <li key={member.id}>
              <Item member={member} />
            </li>
          );
        })}
      </ul>
    );
  }
}
