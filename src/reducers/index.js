import { combineReducers } from 'redux';
import { expenses } from './expenses';
import { auth } from './auth';
import { budget } from './budget';

const rootReducer = combineReducers({
  auth,
  budget,
  expenses,
});

export default rootReducer;
