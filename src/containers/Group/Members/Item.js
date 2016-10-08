import React, {Component, PropTypes} from 'react';

import { getRole } from 'presenters/member';

export default class GroupMembersItem extends Component {
  static propTypes = {
    member: PropTypes.object.isRequired,
  }

  render() {
    const { member } = this.props;

    return (
      <div>
        {`${member.full_name} - `}

        <span className="badge">{getRole(member)}</span>
      </div>
    );
  }
}
