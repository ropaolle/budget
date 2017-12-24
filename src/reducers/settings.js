
import {
  LOAD_USER,
  UPDATE_SETTINGS,
} from '../actions/settings';

export const auth = (state = {}, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: !!action.user,
        user: action.user,
      };
    default:
      return state;
  }
};

export const settings = (state = { isLoaded: false }, action) => {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return {
        ...state,
        isLoaded: true,
        ...action.settings,
      };
    default:
      return state;
  }
};
