import moment from 'moment';
import { database, storageRef, DB_EXSPENSES_COLLECTION, DB_BUDGET_COLLECTION } from './firebase';
// import { generateExpenses } from './fixed-2018';

// function getDocument(collection, document) {
//   return database.collection(collection).doc(document)
//     .get().then(snapshot => snapshot.data());
// }

function getCollection(collection) {
  return (
    database
      .collection(collection)
      // .limit(2)
      .get()
      .then((snapshot) => {
        // console.log(collection, snapshot.size);
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push(doc.data());
        });
        return docs;
      })
  );
}

export function backupDbToFirestore() {
  const filename = `${moment().format('YYYYMMDD-HHmmss')}.txt`;
  const fileRef = storageRef.child(filename);

  return database
    .runTransaction(() => {
      const expenses = getCollection(DB_EXSPENSES_COLLECTION);
      // const budget = getCollection(DB_BUDGET_COLLECTION);
      // const types = getDocument(DB_BUDGET_COLLECTION, 'types');
      return Promise.all([expenses]);
    })
    .then((result) => {
      // console.log('Transaction success.', result.length);
      const file = new File([JSON.stringify(result, null, 4)], '');
      return fileRef.put(file).then((filedata) => {
        console.log(
          `DB saved to ${filename}. Size: ${filedata.totalBytes}, Count: ${result[0].length}`,
        );
        return 'done';
      });
    })
    .catch((err) => {
      console.error(`Transaction failure: ${err}`);
    });
}

export function restoreDbToFirestore() {
  console.log('not implemented');
  return Promise.resolve('not implemented');
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
  bimonthly: 'Bimonthly',
  quartely: 'Quartely',
  oneTime: 'One time',
  yearly: 'Yearly',
  monthly: 'Monthly',
};

export function importTypesAndCategories() {
  return Promise.all([
    database
      .collection(DB_BUDGET_COLLECTION)
      .doc('types')
      .set(types),
    database
      .collection(DB_BUDGET_COLLECTION)
      .doc('categories')
      .set(categories),
  ]).then(() => {
    console.log('Types and categories imported');
  });
}

/* Test utils */

// const testExpenses = [
//   {
//     date: '2018-01-27',
//     cost: 2816,
//     description: 'Hyra',
//     service: 'Fridshyddevägen',
//     type: 'monthly',
//     category: 14,
//   },
// ];

/* function importTestExpensesBatch(docs, collection) {
  if (!collection) return console.log('Collection name requiered!');

  const batch = database.batch();
  docs.forEach((doc) => {
    // Create empty doc with id;
    const expenseRef = database.collection(collection).doc();
    const newDoc = {
      ...doc,
      date: new Date(doc.date),
      recurrent: doc.recurrent ? new Date(doc.recurrent) : null,
      id: expenseRef.id,
    };
    batch.set(expenseRef, newDoc);
  });
  // Max 500 items per commit. For more split array with lodash.chunk.
  return batch.commit().then(() => {
    console.log(`${docs.length} test expenses imported to ${collection}`);
  });
}

export function importTestExpenses(collection) {
  const yearly = generateExpenses();
  return importTestExpensesBatch(yearly, collection);
} */
