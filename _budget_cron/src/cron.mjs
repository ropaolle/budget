/* eslint no-param-reassign: 0 */

import {
  database,
  DB_EXSPENSES_COLLECTION,
  DB_BUDGET_COLLECTION,
} from './firebase.mjs';

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

function updateCache(cacheFunctions) {
  return database.collection(DB_EXSPENSES_COLLECTION)
    .orderBy('date', 'asc')
    .get()
    .then((snapshot) => {
      const batch = database.batch();

      const budgetColl = database.collection(DB_BUDGET_COLLECTION);
      cacheFunctions.forEach((func) => {
        console.log(`Creating ${func.name}`);
        batch.set(budgetColl.doc(func.name), func(snapshot));
      });

      return batch.commit();
    }).catch(error => {
      console.log("Firestore error:", error.message);
    });
}

export default async function cron() {
  await updateCache([
    costPerMonthPerCategori,
    costPerYearPerCategori,
    costPerMonthPerType,
  ]);

  await updateCache([autocompleteText]);

  return Promise.resolve();
}
