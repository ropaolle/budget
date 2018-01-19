/* eslint no-param-reassign: 0 */
/* eslint import/prefer-default-export: 0 */

import moment from 'moment';

import {
  database,
  DB_EXSPENSES_COLLECTION,
  DB_BUDGET_COLLECTION,
} from './firebase';

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

function autocompleteText(query) {
  return query.docs.reduce((acc, doc) => {
    const { description, service } = doc.data();
    if (service && !acc.service.includes(service)) acc.service.push(service);
    if (description && !acc.description.includes(description)) acc.description.push(description);
    return acc;
  }, { description: [], service: [] });
}

function updateCache(cacheFunctions, startYear = 2017) {
  // Start jan 1 selected year, e.g. YYYY-01-01.
  const start = moment(startYear, 'YYYY').startOf('year').toDate();

  return database.collection(DB_EXSPENSES_COLLECTION)
    .orderBy('date', 'asc')
    .startAt(start)
    .get()
    .then((snapshot) => {
      const batch = database.batch();

      const budgetColl = database.collection(DB_BUDGET_COLLECTION);
      cacheFunctions.forEach((func) => {
        const cacheData = func(snapshot);
        console.log(func.name, cacheData);
        batch.set(budgetColl.doc(func.name), cacheData);
      });

      return batch.commit();
    });
}

export async function runCron(fullUpdate) {
  const start = performance.now();

  const startYear = (fullUpdate) ? 2017 : moment().year();
  await updateCache([
    costPerMonthPerCategori,
    costPerYearPerCategori,
    costPerMonthPerType,
  ], startYear);

  await updateCache([autocompleteText]);

  const stop = performance.now();
  console.log(`runCron: ${stop - start} ms`);

  return 'done';
}
