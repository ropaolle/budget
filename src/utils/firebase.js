import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyD2Pm1XxJdEIIzl_ZXhK-ooMG2PdEr_gYw',
  authDomain: 'my-spendings-38b3e.firebaseapp.com',
  databaseURL: 'https://my-spendings-38b3e.firebaseio.com',
  projectId: 'my-spendings-38b3e',
  storageBucket: 'my-spendings-38b3e.appspot.com',
  messagingSenderId: '511310400308',
};

firebase.initializeApp(config);

export const database = firebase.firestore();
export const firebaseAuth = firebase.auth;

// Database paths
export const DB_USERS = 'users';
export const DB_SETTINGS = 'settings';
export const DB_EXSPENSES_ROOT = 'settings';
export const DB_EXSPENSES_COLL = 'budget/items/expenses';
