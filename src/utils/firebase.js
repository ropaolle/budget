import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDsrPH_fYtKmLvDaidU1HKsfA9uKkyVHq0',
  authDomain: 'budget-ec3f9.firebaseapp.com',
  databaseURL: 'https://budget-ec3f9.firebaseio.com',
  projectId: 'budget-ec3f9',
  storageBucket: 'budget-ec3f9.appspot.com',
  messagingSenderId: '47147422899',
};

firebase.initializeApp(config);

export const database = firebase.firestore();
export const firebaseAuth = firebase.auth;
export const storageRef = firebase.storage().ref();

// Database paths
export const DB_USERS = 'users';
export const DB_BUDGET_COLLECTION = 'budget';
export const DB_EXSPENSES_COLLECTION = 'expenses';
