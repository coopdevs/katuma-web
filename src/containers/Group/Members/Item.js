import React, {Component, PropTypes} from 'react';

export default class GroupMembersItem extends Component {
  static propTypes = {
    member: PropTypes.object,
  }

  render() {
    const { member } = this.props;

    return (
      <div>
        {member.id}
      </div>
    );
  }
}
