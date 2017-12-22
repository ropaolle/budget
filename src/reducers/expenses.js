import {
  REQUEST_EXPENSES,
  RECEIVE_EXPENSES,
  UPDATE_EXPENSES,
  DELETE_EXPENSE,
} from '../actions/expenses';

const expensesState = (
  state = {
    // isFetching: false,
    // isLoaded: false,
    items: {},
  },
  action // eslint-disable-line comma-dangle
) => {
  switch (action.type) {
    case REQUEST_EXPENSES:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_EXPENSES:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        items: Object.assign({}, state.items, action.expenses),
        lastUpdated: action.receivedAt,
      };
    case UPDATE_EXPENSES:
      return {
        ...state,
        isLoaded: true,
        items: Object.assign({}, state.items, action.expenses),
      };
    case DELETE_EXPENSE: {
      // Clone items and delete item[action.id]. TODO: Maybe hard to understand
      const { [action.id]: omit, ...items } = state.items;
      return {
        ...state,
        items,
      };
    }
    default:
      return state;
  }
};

// eslint-disable-next-line import/prefer-default-export
export const expenses = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_EXPENSES:
    case REQUEST_EXPENSES:
    case UPDATE_EXPENSES:
    case DELETE_EXPENSE:
      return {
        ...state,
        ...expensesState(state, action),
      };
    default:
      return state;
  }
};
