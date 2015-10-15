import { combineReducers } from 'redux';

import auth from './auth';
import signup from './signup';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import { routerStateReducer } from 'redux-router';

export default combineReducers({
  router: routerStateReducer,
  auth,
  signup,
  form,
  info,
  widgets
});
