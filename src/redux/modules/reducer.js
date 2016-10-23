/* eslint no-debugger: 0 */
import { combineReducers } from 'redux';

import auth, { LOGOUT_SUCCESS } from './auth';
import signupCreateReducer from './signup/create';
import signupCompleteReducer, { COMPLETE_SIGNUP_SUCCESS } from './signup/complete';
import membershipsReducer from './groups/memberships';
import usersReducer from './users/users';
import bulkInvitationsReducer from './invitations/bulk';
import completeInvitationReducer, { COMPLETE_INVITATION_SUCCESS }from './invitations/complete';
import invitationsReducer from './invitations/list';
import groupsReducer from './groups/groups';
import productsReducer from './products/';
import suppliersReducer from './suppliers/suppliers';
import producersReducer from './producers/producers';
import {reducer as form} from 'redux-form';
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
  productsReducer,
  invitationsReducer,
  bulkInvitationsReducer,
  completeInvitationReducer,
  form,
});

/**
 * When something happen and we want to intercept
 * global state
 *
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const interceptRootState = (state, action) => {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return {
        routing: state.routing,
        auth: { loaded: true },
      };

    case COMPLETE_INVITATION_SUCCESS:
    case COMPLETE_SIGNUP_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.result,
          loaded: true,
        },
      };

    default:
      return state;
  }
};

const rootReducer = (state, action) => {
  return appReducers(interceptRootState(state, action), action);
};

export default rootReducer;
