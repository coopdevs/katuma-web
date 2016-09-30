/* eslint no-debugger: 0 */
import { combineReducers } from 'redux';

import auth from './auth';
import signupCreateReducer from './signup/create';
import signupCompleteReducer from './signup/complete';
import membershipsReducer from './groups/memberships';
import usersReducer from './users/users';
import bulkInvitationsReducer from './invitations/bulk';
import completeInvitationReducer from './invitations/complete';
import invitationsReducer from './invitations/list';
import groupsReducer from './groups/groups';
import suppliersReducer from './suppliers/suppliers';
import providersReducer from './providers/providers';
import producersReducer from './producers/list';
import productsReducer from './products/products';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  auth,
  signupCreateReducer,
  signupCompleteReducer,
  membershipsReducer,
  usersReducer,
  groupsReducer,
  suppliersReducer,
  providersReducer,
  producersReducer,
  productsReducer,
  invitationsReducer,
  bulkInvitationsReducer,
  completeInvitationReducer,
  form,
  info,
  widgets
});
