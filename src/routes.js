import _ from 'underscore';
import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';

import { load as loadMemberships } from 'redux/modules/groups/memberships';
import { load as loadGroups } from 'redux/modules/groups/groups';

import {
    App,
    Home,
    Login,
    Signup,
    SignupComplete,
    GroupsBase,
    GroupsList,
    GroupBase,
    GroupMembers,
    GroupSuppliersBase,
    GroupSuppliersDetails,
    OnboardingCreateGroup,
    OnboardingInvitations,
    InvitationComplete,
    NotFound,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/login');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const redirectToGroups = (nextState, replace, cb) => {
    function goToGroups() {
      const {auth: { user }} = store.getState();

      if (user) {
        replace('/groups');
      }

      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth())
        .then(goToGroups);
    } else {
      goToGroups();
    }
  };

  const redirectToGroupsDetail = (nextState, replace, cb) => {
    function getGroupIds() {
      const {membershipsReducer: {memberships: {entities}}} = store.getState();
      return _.uniq(_.pluck(entities, 'basic_resource_group_id'));
    }

    function goToGroupDetail() {
      const groupIds = getGroupIds();

      if (groupIds.length === 0) {
        replace('/onboarding');
      } else if (groupIds.length === 1) {
        replace(`/groups/${groupIds[0]}`);
      }

      cb();
    }

    Promise.all([
      store.dispatch(loadMemberships()),
      store.dispatch(loadGroups()),
    ])
      .then(goToGroupDetail);
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} onEnter={redirectToGroups}/>
      <Route path="login" component={Login} />
      <Route path="invitation/accept/:token" context={store} component={InvitationComplete} />

      {/* Routes signup */}
      <Route path="signup">
        <IndexRoute component={Signup} />
        <Route path="complete" context={store} component={SignupComplete}>
          <Route path=":token" component={SignupComplete}/>
        </Route>
      </Route>

      {/* Routes requiring login */}
      <Route onEnter={requireLogin}>
        <Route path="groups" component={GroupsBase}>
          <IndexRoute component={GroupsList} onEnter={redirectToGroupsDetail}/>
          <Route path=":id" component={GroupBase}>
            <IndexRoute component={GroupMembers}/>
            <Route path="members" component={GroupMembers}/>
            <Route path="suppliers" component={GroupSuppliersBase}/>
            <Route path="suppliers/:producer_id" component={GroupSuppliersDetails}/>
          </Route>
        </Route>

        <Route path="onboarding">
          <IndexRoute component={OnboardingCreateGroup}/>
          <Route path=":id/invitations" component={OnboardingInvitations}/>
        </Route>
      </Route>

      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
