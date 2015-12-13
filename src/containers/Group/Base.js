import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import { loadEntity as loadGroup } from 'redux/modules/groups/groups';
import { load as loadUsers } from 'redux/modules/users/users';

@connect(
  state => ({
    memberships: state.membershipsReducer.memberships
  }),
  {})
export default class GroupBase extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    memberships: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  static fetchData(getState, dispatch, location, params) {
    const {
      groupsReducer: {groups: { byId }},
      usersReducer: { users },
    } = getState();
    const promises = [];
    const id = params.id;
    const group = byId[id];

    if (!users.entities.length) {
      promises.push(dispatch(loadUsers()));
    }

    if (!group) {
      promises.push(dispatch(loadGroup(id)));
    }

    return Promise.all(promises);
  }

  render() {
    const { groups, memberships, params: { id }} = this.props;
    const group = groups.byId[id];

    const groupSection = () => {
      return (
        <div>
          <h1 className="h4">{group.name}</h1>
          {React.cloneElement(this.props.children, {group: group, memberships: memberships})}
        </div>
      );
    };

    return (
      <div>
        {!group && <div>group not found</div>}
        {group && groupSection()}
      </div>
    );
  }
}

