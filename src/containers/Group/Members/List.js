import React, {Component, PropTypes} from 'react';

import { getMember } from 'presenters/member';

import Item from './Item';

export default class GroupMembersList extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    memberships: PropTypes.array,
  }

  render() {
    const { memberships, users } = this.props;

    return (
      <ul>
        {memberships.map((membership) => {
          const user = users[membership.user_id];
          const member = getMember(user, membership);

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
