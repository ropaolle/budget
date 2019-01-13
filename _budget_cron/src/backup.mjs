import moment from 'moment';
import fs from 'fs';
import chalk from 'chalk';
import {
  database,
  DB_USERS,
  DB_BUDGET_COLLECTION,
  DB_EXSPENSES_COLLECTION,
} from './firebase.mjs';

// const BACKUP_DIR = `${process.env.HOME}/budget-backup`;
const BACKUP_DIR = `./backup`;

function saveCollection(collection) {
  const filename = `${moment().format('YYYYMMDD-HHmmss')}-${collection}.txt`;
  const wstream = fs.createWriteStream(`${BACKUP_DIR}/${filename}`);
  return database.collection(collection)
    .get()
    .then((snapshot) => {
      console.log(`${snapshot.docs.length} records saved to ${BACKUP_DIR}/${filename}`);
      const data = snapshot.docs.map(doc => doc.data());
      wstream.write(JSON.stringify(data, null, 4));
    })
    .then(() => { wstream.end(); })
    .catch(error => {
      console.log("Firestore error:", error.message);
  });
}

export default async function backupDbToFile() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR);
  }

  await saveCollection(DB_USERS);
  await saveCollection(DB_BUDGET_COLLECTION);
  await saveCollection(DB_EXSPENSES_COLLECTION);

  return Promise.resolve();
}
