import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(
  state => ({
    memberships: state.groupsReducer.memberships
  }),
  {})
export default class GroupBase extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  render() {
    const group = this.props.groups.byId[this.props.params.id];

    return (
      <div className="container">
        <h1>{group.name}</h1>
        <div>
          {React.cloneElement(this.props.children, {group: group})}
        </div>
      </div>
    );
  }
}

