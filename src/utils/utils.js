/* eslint no-param-reassign: 0 */
import reduce from 'lodash.reduce';

import {
  database,
  DB_EXSPENSES_COLLECTION,
  DB_BUDGET_COLLECTION,
} from './firebase';

export function toSEK(cost, showOre = false) {
  return cost.toLocaleString('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: (showOre) ? 2 : 0,
    maximumFractionDigits: (showOre) ? 2 : 0,
  });
}

export function summarizeCostsInSEK(costs, showOre = false) {
  const cost = costs.reduce((sum, val) => sum + (val || 0), 0);
  return toSEK(cost, showOre);
}

export function costPerCategory(costs) {
  return reduce(costs, (acc, val, i) => {
    acc[i] = (i < 100) ? val : 0;
    return acc;
  }, []);
}

export function summarizeCost(costs, year, compareFunc) {
  if (!costs[year]) return [];
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return months.map(month =>
    reduce(
      costs[year][month],
      (acc, value, type) => (compareFunc(type) ? acc + value : acc),
      0,
    ),
  );
}

/* function getCount(perMonth = false) {
  return database.collection(DB_EXSPENSES_COLLECTION)
    .orderBy('date', 'asc')
    .get()
    .then((query) => {
      const counterObj = query.docs.reduce((counters, doc) => {
        const { category, type, date, cost } = doc.data();

        // Add year and month
        const year = date.getYear() + 1900;
        const month = date.getMonth();
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
} */

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

function costPerMonthPerType(query) {
  return query.docs.reduce((counters, doc) => {
    const { category, type, date, cost } = doc.data();

    // Add year, month, and categories properties if missing
    const year = date.getYear() + 1900;
    const month = date.getMonth();
    if (!counters[year]) counters[year] = {};
    if (!counters[year][month]) counters[year][month] = {};
    const types = counters[year][month];
    if (!types[type]) types[type] = 0;

    // Increment cost
    types[type] += (category < 100) ? cost : 0;

    return counters;
  }, {});
}

function costPerMonthPerCategori(query) {
  return query.docs.reduce((counters, doc) => {
    const { category, date, cost } = doc.data();

    // Add year, month, and categories properties if missing
    const year = date.getYear() + 1900;
    const month = date.getMonth();
    if (!counters[year]) counters[year] = {};
    if (!counters[year][month]) counters[year][month] = {};
    const categories = counters[year][month];
    if (!categories[category]) categories[category] = 0;

    // Increment cost
    categories[category] += cost;

    return counters;
  }, {});
}

function costPerYearPerCategori(query) {
  return query.docs.reduce((counters, doc) => {
    const { category, date, cost } = doc.data();

    // Add year and categories properties if missing
    const year = date.getYear() + 1900;
    if (!counters[year]) counters[year] = {};
    const categories = counters[year];
    if (!categories[category]) categories[category] = 0;

    // Increment cost
    categories[category] += cost;

    return counters;
  }, {});
}

function getCost(costFunc) {
  return database.collection(DB_EXSPENSES_COLLECTION)
    .orderBy('date', 'asc')
    .get()
    .then((query) => {
      // const costFunc = (perMonth) ? costPerMonthPerCategori : costPerYearPerCategori;
      const dbObj = costFunc(query);
      console.log(costFunc.name, dbObj);
      database.collection(DB_BUDGET_COLLECTION).doc(costFunc.name).set(dbObj);
    });
}

export function runCron() {
  return Promise.all([
    getCost(costPerMonthPerCategori),
    getCost(costPerYearPerCategori),
    getCost(costPerMonthPerType),
    getAutocompleteText(),
  ]);
}
