import { combineReducers } from 'redux';
import { expenses } from './expenses';
import { auth, settings } from './settings';

const rootReducer = combineReducers({
  auth,
  expenses,
  settings,
});

export default rootReducer;
