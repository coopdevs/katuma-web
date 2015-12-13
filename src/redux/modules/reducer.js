/* eslint no-debugger: 0 */
import { combineReducers } from 'redux';

import auth from './auth';
import signupCreateReducer from './signup/create';
import signupCompleteReducer from './signup/complete';
import membershipsReducer from './groups/memberships';
import usersReducer from './users/users';
import bulkInvitationsReducer from './invitations/bulk';
import completeInvitationReducer from './invitations/complete';
import groupsReducer from './groups/groups';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import { routerStateReducer } from 'redux-router';

export default combineReducers({
  router: routerStateReducer,
  auth,
  signupCreateReducer,
  signupCompleteReducer,
  membershipsReducer,
  usersReducer,
  groupsReducer,
  bulkInvitationsReducer,
  completeInvitationReducer,
  form,
  info,
  widgets
});
