import React, {Component, PropTypes} from 'react';

import { getRole } from 'helpers/entities/member';

export default class GroupMembersItem extends Component {
  static propTypes = {
    member: PropTypes.object,
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
