import React, {Component, PropTypes} from 'react';

import Item from './Item';

export default class GroupMembersList extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    members: PropTypes.array.isRequired,
  }

  render() {
    const { members } = this.props;

    const memberList = members.map((member) => {
      return (<li key={member.id}><Item member={member} /></li>);
    });

    return (<ul>{memberList}</ul>);
  }
}
