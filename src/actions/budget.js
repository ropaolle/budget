import { database, DB_BUDGET_COLLECTION } from '../utils';

export const REQUEST_BUDGET = 'REQUEST_BUDGET';
export const RECEIVE_BUDGET = 'RECEIVE_BUDGET';
// export const UPDATE_BUDGET = 'UPDATE_BUDGET';

const requestBudget = () => ({
  type: REQUEST_BUDGET,
});

const receiveBudget = budget => ({
  type: RECEIVE_BUDGET,
  budget,
});

const budgetCollectionKeyedById = docs => docs.reduce((budget, doc) => ({
  ...budget,
  [doc.id]: doc.data(),
}), {});

export const fetchBudget = () => (dispatch) => {
  dispatch(requestBudget());

  return database.collection(DB_BUDGET_COLLECTION).get()
    .then(snapshot => budgetCollectionKeyedById(snapshot.docs))
    .then(json => dispatch(receiveBudget(json)));
};
