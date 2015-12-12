import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import { loadEntity as loadGroup } from 'redux/modules/groups/groups';

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

  static fetchData(getState, dispatch, location, params) {
    const { groupsReducer: {groups: { byId }}} = getState();
    const id = params.id;
    const group = byId[id];

    if (!group) {
      return dispatch(loadGroup(id));
    }
  }

  render() {
    const group = this.props.groups.byId[this.props.params.id];

    const groupSection = (g) => {
      return (
        <div>
          <h1>{g.name}</h1>
          {React.cloneElement(this.props.children, {group: g})}
        </div>
      );
    };

    return (
      <div>
        {!group && <div>group not found</div>}
        {group && groupSection(group)}
      </div>
    );
  }
}

