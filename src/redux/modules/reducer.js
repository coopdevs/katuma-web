/* eslint no-debugger: 0 */
import { combineReducers } from 'redux';

import auth, { LOGOUT_SUCCESS } from './auth';
import signupCreateReducer from './signup/create';
import signupCompleteReducer from './signup/complete';
import membershipsReducer from './groups/memberships';
import usersReducer from './users/users';
import bulkInvitationsReducer from './invitations/bulk';
import completeInvitationReducer from './invitations/complete';
import invitationsReducer from './invitations/list';
import groupsReducer from './groups/groups';
import suppliersReducer from './suppliers/list';
import producersReducer from './producers/list';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

const appReducers = combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  auth,
  signupCreateReducer,
  signupCompleteReducer,
  membershipsReducer,
  usersReducer,
  groupsReducer,
  suppliersReducer,
  producersReducer,
  invitationsReducer,
  bulkInvitationsReducer,
  completeInvitationReducer,
  form,
  info,
  widgets
});

const rootReducer = (state, action) => {
  let finalState = state;

  // On logout empty store!
  // We don't want user data leaks
  if (action.type === LOGOUT_SUCCESS) {
    finalState = undefined;
  }

  return appReducers(finalState, action);
};

export default rootReducer;
