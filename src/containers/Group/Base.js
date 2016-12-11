import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import { getMember } from 'presenters/member';
import { load as loadUsers } from 'redux/modules/users/users';
import { load as loadMemberships } from 'redux/modules/groups/memberships';

import Card from 'components/Card';
import Header from '../Header';
import Navigation from './Navigation';

import styles from './styles/index.scss';

const ErrorMessage = ({ message }) => (
  <div>{message}</div>
);

export default class Base extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    memberships: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    group: PropTypes.object,
  }

  renderChildren() {
    const { users, user, memberships, group } = this.props;

    if (!group) return (<ErrorMessage message="Group not found"/>);

    return React.cloneElement(
      this.props.children,
      { group, user, memberships, users }
    );
  }

  render() {
    const { group } = this.props;

    return (
      <div className={styles.group}>
        <Header currentGroup={group}/>
        <div className={`wrap container-fluid ${styles.group__contentWrapper}`}>
          <div className="row">
            <div className="col-xs-12">
              <Card>
                {group && <Navigation group={group} />}
                <div className={styles.group__content}>{this.renderChildren()}</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
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

const asyncConnectProps = [{
  promise: ({ store: { dispatch }, params: { id } }) => {
    return Promise.all([
      dispatch(loadUsers(id)),
      dispatch(loadMemberships(id)),
    ]);
  }
}];

export default compose(
  asyncConnect(asyncConnectProps),
  connect(mapStateToProps)
)(Base);
