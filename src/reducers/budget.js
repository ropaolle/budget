import {
  REQUEST_BUDGET,
  RECEIVE_BUDGET,
  // UPDATE_BUDGET,
} from '../actions/budget';

// eslint-disable-next-line import/prefer-default-export
export const budget = (state = { isLoaded: false, isFetching: false }, action) => {
  switch (action.type) {
    case REQUEST_BUDGET:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_BUDGET:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        ...Object.assign({}, action.budget),
      };
    // case UPDATE_BUDGET:
    default:
      return state;
  }
};
