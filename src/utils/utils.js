/* eslint no-param-reassign: 0 */
/* eslint-disable2 */
import { database, DB_EXSPENSES_COLL, DB_EXSPENSES_ROOT } from './firebase';

const docs = [
  { date: '2017-04-27', cost: '112', description: 'Unionen A-kassa', service: 'Unionen A-kassa', type: 'monthly', comment: '', category: 13, recurrent: '' },
  { date: '2017-04-27', cost: '2700', description: 'Hyra', service: 'Fridshyddevägen', type: 'monthly', comment: 'Fridshyddevägen', category: 14, recurrent: '' },
  { date: '2017-05-09', cost: '61', description: 'Privata repositories', service: 'GitHub.com', type: 'monthly', comment: 'GitHUb', category: 7, recurrent: '' },
  { date: '2017-05-27', cost: '145', description: 'Mobiltelefon', service: 'Comviq', type: 'monthly', comment: 'Comviq', category: 7, recurrent: '' },
  { date: '2017-10-09', cost: '15', description: 'Backblaze B2', service: 'Backblaze', type: 'monthly', comment: 'Backblaze', category: 7, recurrent: '' },
];

const getYear = date => date.getYear() + 1900;

const getMonth = (date) => {
  const month = (date.getMonth() + 1).toString();
  return (month.length === 1) ? `0${month}` : month;
};

function getCount(perMonth = false) {
  return database.collection(DB_EXSPENSES_COLL)
    .orderBy('date', 'asc')
    // .limit(300)
    .get()
    .then((query) => {
      // console.log('FULL: ', query.docs.map(doc => doc.data()));
      const counterObj = query.docs.reduce((counters, doc) => {
        const { category, type, date, cost } = doc.data();

        // Add year and month
        const year = getYear(date);
        const month = getMonth(date);
        let currTypes;
        let currCategories = [];
        const rootObj = { types: {}, categories: {} };

        if (perMonth) {
          if (!counters[year]) counters[year] = {};
          if (!counters[year][month]) {
            counters[year][month] = rootObj;
          }
          currTypes = counters[year][month].types;
          currCategories = counters[year][month].categories;
        } else {
          if (!counters[year]) counters[year] = rootObj;
          currTypes = counters[year].types;
          currCategories = counters[year].categories;
        }

        if (!currTypes[type]) currTypes[type] = 0;
        if (!currCategories[category]) currCategories[category] = { count: 0, cost: 0 };

        // Count
        currTypes[type] += 1;
        currCategories[category].count += 1;
        currCategories[category].cost += cost;

        return counters;
      }, {});

      const dbDoc = (perMonth) ? 'counters-month' : 'counters-year';
      database.collection(DB_EXSPENSES_ROOT).doc(dbDoc).set(counterObj);
      console.log(dbDoc, counterObj);
    });
}

function getAutocompleteText() {
  return database.collection(DB_EXSPENSES_COLL)
    .get()
    .then((query) => {
      const textObj = query.docs.reduce((texts, doc) => {
        const { description, service } = doc.data();

        if (!texts.service.find(val => val.label === service)) {
          texts.service.push({ label: service });
        }
        if (!texts.description.find(val => val.label === description)) {
          texts.description.push({ label: description });
        }
        return texts;
      }, { description: [], service: [] });
      database.collection(DB_EXSPENSES_ROOT).doc('autocomplete').set(textObj);
      console.log('Autocomplete: ', textObj);
    });
}

export function runCron() {
  return Promise.all([
    getCount(true),
    getAutocompleteText(),
  ]);
}

export function importExpensesBatch() {
  const batch = database.batch();
  docs.forEach((doc) => {
    const expenseRef = database.collection(DB_EXSPENSES_COLL).doc(); // Create empty doc with id;
    const newDoc = {
      ...doc,
      date: new Date(doc.date),
      recurrent: (doc.recurrent) ? new Date(doc.recurrent) : null,
      cost: Number(doc.cost.replace(',', '.')),
      id: expenseRef.id,
    };
    console.log(newDoc);
    batch.set(expenseRef, newDoc);
  });
  return batch.commit();
}
