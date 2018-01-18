import { database, DB_EXSPENSES_COLLECTION } from '../utils';

export const REQUEST_EXPENSES = 'REQUEST_EXPENSES';
export const RECEIVE_EXPENSES = 'RECEIVE_EXPENSES';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

const requestExpenses = () => ({
  type: REQUEST_EXPENSES,
});

const receiveExpenses = expenses => ({
  type: RECEIVE_EXPENSES,
  expenses,
});

export const updateExpense = expense => ({
  type: UPDATE_EXPENSE,
  expense,
});

export const deleteExpense = id => ({
  type: DELETE_EXPENSE,
  id,
});

const expensesKeyedById = docs => docs.reduce((expenses, doc) => ({
  ...expenses,
  [doc.id]: {
    ...doc.data(),
    date: doc.data().date.toLocaleDateString('sv-SE'),
    recurrent: (doc.data().recurrent) ?
      doc.data().recurrent.toLocaleDateString('sv-SE')
      :
      null,
  },
}), {});

function oldestExpense(state) {
  const { expenses } = state;
  if (!expenses.items) return '';
  const keys = Object.keys(expenses.items);
  const lastKey = keys[keys.length - 1];
  return expenses.items[lastKey];
}

export const fetchExpenses = limit => (dispatch, getState) => {
  dispatch(requestExpenses());

  // OrderBy more then one field requiers that you manualy create an index that includes all fields
  // in Firestore.
  const now = new Date(); // moment().toDate();
  let query = database.collection(DB_EXSPENSES_COLLECTION)
    .orderBy('date', 'desc')
    .orderBy('id')
    .startAt(now);

  const { date, id } = oldestExpense(getState());
  if (date && id) query = query.startAfter(new Date(date), id);

  query.limit(limit || 20)
    .get()
    .then(snapshot => expensesKeyedById(snapshot.docs))
    .then(json => dispatch(receiveExpenses(json)));
};
