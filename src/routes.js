import _ from 'underscore';
import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { load as loadMemberships } from 'redux/modules/groups/memberships';

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
  GroupProducers,
  GroupOrders,
  GroupOrdersList,
  GroupOrderBase,
  GroupOrderShow,
  GroupOrderEdit,
  OnboardingCreateGroup,
  OnboardingInvitations,
  OnboardingCreateProducer,
  OnboardingCreateProducts,
  InvitationComplete,
  NotFound,
} from 'containers';

/**
 * Go to group detail if user only has 1 membership
 * if user has 0 memberships means he doesn't belongs to any
 * group, so we redirect him to onboarding. Other way redirect
 * him to list of groups.
 *
 * @param {Object} store
 * @param {Function} listPath
 * @param {Function} replace
 * @param {Function} callback
 */
const goToGroupDetail = (store, listPath, replace, callback) => {
  const {
    membershipsReducer: { memberships: { byBasicResourceGroupId } },
  } = store.getState();
  const groupIds = _.keys(byBasicResourceGroupId);

  if (groupIds.length === 0) {
    replace('/onboarding');
  } else if (groupIds.length === 1) {
    replace(`/groups/${groupIds[0]}`);
  } else {
    replace(listPath);
  }

  callback();
};

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
      const { auth: { user } } = store.getState();

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
    const listPath = '/groups/list';
    const groupDetail = /groups\/\d+/;
    const { pathname } = nextState.location;

    if (pathname === listPath || groupDetail.test(pathname)) {
      cb();
    } else {
      Promise
        .all([store.dispatch(loadMemberships())])
        .then(() => {
          goToGroupDetail(store, listPath, replace, cb);
        });
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} onEnter={redirectToGroups}/>
      <Route path="login" component={Login} />
      <Route path="invitation/accept/:token" context={store} component={InvitationComplete} />

      {/* Routes signup */}
      <Route path="signup">
        <IndexRoute component={Signup} />
        <Route
          path="complete/:token"
          component={SignupComplete}
          onEnter={SignupComplete.onEnter(store)}
        />
      </Route>

      {/* Routes requiring login */}
      <Route onEnter={requireLogin}>
        <Route path="groups" component={GroupsBase} onEnter={redirectToGroupsDetail}>
          <IndexRoute component={GroupsList} />
          <Route path="list" component={GroupsList} />

          <Route path=":id" component={GroupBase}>
            <IndexRoute component={GroupMembers}/>
            <Route path="members" component={GroupMembers}/>
            <Route path="producers" component={GroupProducers}/>
            <Route path="orders" component={GroupOrders}>
              <IndexRoute component={GroupOrdersList}/>
              <Route path=":order_id" component={GroupOrderBase}>
                <IndexRoute component={GroupOrderShow}/>
                <Route path="edit" component={GroupOrderEdit}/>
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="onboarding">
          <IndexRoute component={OnboardingCreateGroup}/>
          <Route path=":id/invitations" component={OnboardingInvitations}/>
          <Route path=":id/producer" component={OnboardingCreateProducer}/>
          <Route path=":id/producer/:producer_id/products" component={OnboardingCreateProducts}/>
        </Route>
      </Route>

      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
