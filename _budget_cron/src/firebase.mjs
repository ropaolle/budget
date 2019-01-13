import admin from 'firebase-admin';
import serviceAccount from '../keys/firebaseKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const database = admin.firestore();

export const DB_USERS = 'users';
export const DB_BUDGET_COLLECTION = 'budget';
export const DB_EXSPENSES_COLLECTION = 'expenses';
