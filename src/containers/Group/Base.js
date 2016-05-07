import _ from 'underscore';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';

import { loadEntity as loadGroup } from 'redux/modules/groups/groups';
import { load as loadUsers } from 'redux/modules/users/users';
import { load as loadMemberships } from 'redux/modules/groups/memberships';
import { membersWithUserSelector } from 'selectors/members';
import { suppliersWithProducerSelector } from 'selectors/producers';

function groupSelector(state) {
  return {
    ...membersWithUserSelector(state),
    user: state.auth.user,
    suppliers: state.suppliersReducer.suppliers.entities,
    ...suppliersWithProducerSelector(state),
  };
}

@asyncConnect([{
  promise: (options) => {
    const {
      store: { dispatch, getState },
      params,
    } = options;

    const {
      groupsReducer: {groups: { byId }},
      usersReducer: { users },
      membershipsReducer: { memberships },
    } = getState();
    const promises = [];
    const id = params.id;
    const group = byId[id];

    if (!users.entities.length) {
      promises.push(dispatch(loadUsers()));
    }

    if (!memberships.entities.length) {
      promises.push(dispatch(loadMemberships()));
    }

    if (!group) {
      promises.push(dispatch(loadGroup(id)));
    }

    return Promise.all(promises);
  }
}])
@connect(groupSelector, {})
export default class GroupBase extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    user: PropTypes.object,
    members: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    suppliers: PropTypes.array.isRequired,
    producers: PropTypes.object.isRequired,
  }

  render() {
    const { producers, suppliers, user, groups, members, params: { id }} = this.props;
    const group = groups.byId[id];

    const membersOfGroup = members.byGroupID[group.id] || [];
    const currentUser = _.findWhere(membersOfGroup, {user_id: user.id});

    const groupSection = () => {
      return (
        <div>
          <h1 className="h4">{group.name}</h1>
          {React.cloneElement(
            this.props.children,
            {
              group: group,
              currentUser: currentUser,
              members: membersOfGroup,
              suppliers,
              producers,
            }
          )}
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

