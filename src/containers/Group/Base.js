import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import { getMember } from 'presenters/member';
import { loadGroup } from 'redux/modules/groups/groups';
import { load as loadUsers } from 'redux/modules/users/users';
import { load as loadMemberships } from 'redux/modules/groups/memberships';

import Header from '../Header';
import Sidebar from './Sidebar';

export default class Base extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    memberships: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    group: PropTypes.object,
  }

  render() {
    const { users, user, memberships, group } = this.props;

    // if (!user || !memberships.length) return null;

    if (!group) {
      return (<div>group not found</div>);
    }

    return (
      <div>
        <Header currentGroup={group}/>
        <Sidebar group={group} />
        {React.cloneElement(
          this.props.children,
          { group, user, memberships, users }
        )}
      </div>
    );
  }
}

const mapStateToProps = (_state, ownProps) => {
  return (state) => {
    const { groupsReducer, membershipsReducer, usersReducer, auth } = state;
    const { params: { id } } = ownProps;
    const memberships = membershipsReducer.memberships.byBasicResourceGroupId[id] || [];
    const membersUserId = _.pluck(memberships, 'user_id');
    const users = _.indexBy(usersReducer.users.entities.filter((user) => {
      return _.include(membersUserId, user.id);
    }), 'id');
    const userId = auth.user ? auth.user.id : null;
    const membership = _.findWhere(memberships, { user_id: userId });
    const user = userId && membership ? getMember(auth.user, membership) : {};

    return {
      users,
      user,
      memberships,
      group: groupsReducer.groups.byId[id],
    };
  };
};

const asyncConnectProps = [{
  promise: ({ store: { dispatch }, params: { id } }) => {
    return Promise.all([
      dispatch(loadGroup(id)),
      dispatch(loadUsers(id)),
      dispatch(loadMemberships(id)),
    ]);
  }
}];

export default compose(
  asyncConnect(asyncConnectProps),
  connect(mapStateToProps)
)(Base);
