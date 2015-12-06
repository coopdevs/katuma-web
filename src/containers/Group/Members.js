import React, {Component, PropTypes} from 'react';

export default class GroupMembers extends Component {
  static propTypes = {
    group: PropTypes.object,
  }

  render() {
    return (
        <div>
          <h1>Members of {this.props.group.name}</h1>
        </div>
    );
  }
}
