import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';

import app from './appReducer';
import maps from './mapsReducer';

export default combineReducers({
  form,
  app,
  maps
});