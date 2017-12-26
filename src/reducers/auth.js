import {
  UPDATE_USER,
} from '../actions/auth';

// eslint-disable-next-line import/prefer-default-export
export const auth = (state = {
  isAuthenticated: false,
  isLoaded: false,
}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        isLoaded: true,
        isAuthenticated: !!action.user,
        user: action.user,
      };
    default:
      return state;
  }
};
