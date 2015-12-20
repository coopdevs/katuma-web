import React, {Component, PropTypes} from 'react';

import Item from './Item';

export default class GroupMembersList extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    members: PropTypes.object.isRequired,
  }

  render() {
    const { members, group: {id}} = this.props;
    const membersOfGroup = members.byGroupID[id] || [];

    const memberList = membersOfGroup.map((member) => {
      return (<li key={member.id}><Item member={member} /></li>);
    });

    return (<ul>{memberList}</ul>);
  }
}
