/* eslint no-param-reassign: 0 */

import {
  database,
  DB_EXSPENSES_COLLECTION,
  DB_BUDGET_COLLECTION,
} from './firebase';

const getYear = date => date.getYear() + 1900;

const getMonth = (date) => {
  const month = (date.getMonth()).toString();
  return (month.length === 1) ? `${month}` : month;
};

function getCount(perMonth = false) {
  return database.collection(DB_EXSPENSES_COLLECTION)
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
      database.collection(DB_BUDGET_COLLECTION).doc(dbDoc).set(counterObj);
      console.log(dbDoc, counterObj);
    });
}

export function getAutocompleteText() {
  return database.collection(DB_EXSPENSES_COLLECTION)
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
      database.collection(DB_BUDGET_COLLECTION).doc('autocomplete').set(textObj);
      console.log('Autocomplete: ', textObj);
    });
}

export function runCron() {
  return Promise.all([
    getCount(true),
    getCount(false),
    getAutocompleteText(),
  ]);
}
