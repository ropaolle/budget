/* eslint-disable */

import {
  database,
  DB_EXSPENSES_COLLECTION,
  DB_BUDGET_COLLECTION,
} from './firebase';

import { oneTime, multipleTime } from './expenses';

const test = [
  { date: '2017-12-27', cost: '112', description: 'Unionen A-kassa', service: 'Unionen A-kassa', type: 'monthly', comment: '', category: 13, recurrent: '' },
  { date: '2017-12-27', cost: '2700', description: 'Hyra', service: 'Fridshyddevägen', type: 'monthly', comment: 'Fridshyddevägen', category: 14, recurrent: '' },
  { date: '2017-12-09', cost: '61', description: 'Privata repositories', service: 'GitHub.com', type: 'monthly', comment: 'GitHUb', category: 7, recurrent: '' },
  { date: '2018-01-27', cost: '145', description: 'Mobiltelefon', service: 'Comviq', type: 'monthly', comment: 'Comviq', category: 7, recurrent: '' },
  { date: '2018-01-09', cost: '15', description: 'Backblaze B2', service: 'Backblaze', type: 'monthly', comment: 'Backblaze', category: 7, recurrent: '' },
  { date: '2017-12-09', cost: '2500', description: 'Backblaze B2', service: 'Backblaze', type: 'monthly', comment: 'Backblaze', category: 100, recurrent: '' },
  { date: '2017-12-09', cost: '500', description: 'Backblaze B2', service: 'Backblaze', type: 'monthly', comment: 'Backblaze', category: 101, recurrent: '' },
  { date: '2018-01-09', cost: '600', description: 'Backblaze B2', service: 'Backblaze', type: 'monthly', comment: 'Backblaze', category: 100, recurrent: '' },
  { date: '2018-01-09', cost: '500', description: 'Backblaze B2', service: 'Backblaze', type: 'monthly', comment: 'Backblaze', category: 101, recurrent: '' },
];

function importExpensesBatch(docs) {
  const batch = database.batch();
  docs.forEach((doc) => {
    // Create empty doc with id;
    const expenseRef = database.collection(DB_EXSPENSES_COLLECTION).doc();
    const newDoc = {
      ...doc,
      date: new Date(doc.date),
      recurrent: (doc.recurrent) ? new Date(doc.recurrent) : null,
      cost: Number(doc.cost.replace(',', '.').replace(' ', '')),
      id: expenseRef.id,
    };
    console.log(newDoc);
    batch.set(expenseRef, newDoc);
  });
  return batch.commit();
}

export function importExpenses() {
  importExpensesBatch(multipleTime);
  return importExpensesBatch(oneTime);
}


const categories = {
  0: 'Övrigt',
  1: 'Bygg',
  2: 'Bil',
  3: 'Bar',
  4: 'Mat',
  5: 'Medicin',
  6: 'Restaurang',
  7: 'Tjänster',
  8: 'Elektronik',
  9: 'Resor',
  10: 'Bubbis',
  11: 'Kläder/möbler/mm',
  12: 'El',
  13: 'Försäkringar',
  14: 'Hyra',
  15: 'Pension',
  100: 'Licencia Lön',
  101: 'Licencia Pension',
  102: 'Tradera',
  103: 'Skatteåterböring',
};

const types = {
  quartely: 'Quartely',
  oneTime: 'One time',
  yearly: 'Yearly',
  monthly: 'Monthly',
};

export function importTypesAndCategories() {
  // Update types
  database.collection(DB_BUDGET_COLLECTION).doc('types').set(types);
  database.collection(DB_BUDGET_COLLECTION).doc('categories').set(categories);
  console.log('importTypesAndCategories');
}
