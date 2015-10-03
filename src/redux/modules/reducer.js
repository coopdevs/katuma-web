import { combineReducers } from 'redux';

import auth from './auth';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';

export default combineReducers({
  auth,
  form,
  info,
  widgets
});
