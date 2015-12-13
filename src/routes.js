import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';

import { load as loadMemberships } from 'redux/modules/groups/memberships';
import { load as loadGroups } from 'redux/modules/groups/groups';

import {
    App,
    Home,
    Widgets,
    Login,
    Signup,
    SignupComplete,
    GroupsBase,
    GroupsList,
    GroupBase,
    GroupMembers,
    OnboardingCreateGroup,
    InvitationComplete,
    Survey,
    NotFound,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    /**
     * Check if user must be refetched.
     * Cases:
     *  1. User is not login
     *  2. After signup complete success
     *  3. After inviation complete success
     *
     * @param {Redux<Object>} state
     * @return {Boolean}
     */
    function needsUserFetch(state) {
      return !isAuthLoaded(state) ||
             state.completeInvitationReducer.complete ||
             state.signupCompleteReducer.complete;
    }

    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/login');
      }
      cb();
    }

    const fetchUser = needsUserFetch(store.getState());

    if (fetchUser) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const redirectToGroups = (nextState, replaceState, cb) => {
    function goToGroups() {
      const {auth: { user }} = store.getState();

      if (user) {
        replaceState(null, '/groups');
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

  const redirectToGroupsDetail = (nextState, replaceState, cb) => {
    function goToGroupDetail() {
      const {membershipsReducer: {memberships: {entities}}} = store.getState();

      if (entities && entities.length === 1) {
        replaceState(null, `/groups/${entities[0].group_id}`);
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
      <Route path="widgets" component={Widgets}/>
      <Route path="login" component={Login}/>
      <Route path="invitation/accept/:token" context={store} component={InvitationComplete} onEnter={InvitationComplete.onEnter} />

      {/* Routes signup */}
      <Route path="signup">
        <IndexRoute component={Signup}/>
        <Route path="complete" context={store} onEnter={SignupComplete.onEnter}>
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
          </Route>
        </Route>

        <Route path="onboarding">
          <IndexRoute component={OnboardingCreateGroup}/>
        </Route>

      </Route>

      <Route path="/survey" component={Survey}/>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
