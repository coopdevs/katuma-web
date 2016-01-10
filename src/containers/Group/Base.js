import _ from 'underscore';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import { loadEntity as loadGroup } from 'redux/modules/groups/groups';
import { load as loadUsers } from 'redux/modules/users/users';
import { load as loadMemberships } from 'redux/modules/groups/memberships';
import { load as loadInvitations } from 'redux/modules/invitations/list';
import { membersWithUserSelector } from 'selectors/members';

function groupSelector(state) {
  return {
    ...membersWithUserSelector(state),
    invitations: state.invitationsReducer.invitations,
    user: state.auth.user,
  };
}

@connect(groupSelector, {})
export default class GroupBase extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    user: PropTypes.object,
    invitations: PropTypes.object.isRequired,
    members: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  static fetchData(getState, dispatch, location, params) {
    const {
      groupsReducer: {groups: { byId }},
      usersReducer: { users },
      membershipsReducer: { memberships },
    } = getState();
    const promises = [];
    const id = params.id;
    const group = byId[id];

    promises.push(dispatch(loadInvitations(id)));

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

  render() {
    const { user, invitations, groups, members, params: { id }} = this.props;
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
              invitations: invitations,
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

