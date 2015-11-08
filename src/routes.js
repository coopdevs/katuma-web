/* eslint no-debugger: 0 */
import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { load as loadMemberships } from 'redux/modules/groups/memberships';

import {
    App,
    Home,
    Widgets,
    Login,
    Signup,
    SignupComplete,
    GroupsList,
    GroupBase,
    OnboardingCreateGroup,
    OnboardingMembers,
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
     *
     * @param {Redux<Object>} state
     * @param {function} authLoaded
     * @return {Boolean}
     */
    function needsUserFetch(state, authLoaded) {
      return !authLoaded(state) ||
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

    const fetchUser = needsUserFetch(store.getState(), isAuthLoaded);

    if (fetchUser) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const redirectToGroups = (nextState, replaceState, cb) => {
    function checkUser() {
      const { auth: { user }} = store.getState();

      if (user) {
        replaceState(null, '/groups');
      }

      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkUser);
    } else {
      checkUser();
    }
  };

  const checkUserGroups = (nextState, replaceState, cb) => {
    function checkMemberships() {
      const {membershipsReducer: {memberships}} = store.getState();

      if (!memberships.length) {
        replaceState(null, '/onboarding');
      } else if (memberships.length === 1) {
        replaceState(store, `/groups/${memberships[0].group_id}`);
      }

      cb();
    }

    const {membershipsReducer: {memberships}} = store.getState();

    if (!memberships.length) {
      store.dispatch(loadMemberships()).then(checkMemberships);
    } else {
      checkMemberships();
    }
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

        <Route path="groups">
          <IndexRoute component={GroupsList} onEnter={checkUserGroups}/>
          <Route path=":id" component={GroupBase}/>
        </Route>

        <Route path="onboarding">
          <IndexRoute component={OnboardingCreateGroup}/>
          <Route path=":id/members" component={OnboardingMembers}/>
        </Route>

      </Route>

      <Route path="/survey" component={Survey}/>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
