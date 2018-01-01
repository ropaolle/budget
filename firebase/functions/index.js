const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const ref = admin.firestore();

exports.cron = functions.https.onRequest((request, response) => {
  ref.collection('expenses')
    .orderBy('date', 'desc')
    .limit(3)
    .get()
    .then((query) => {
      console.log('Size', query.size);
      const docs = query.docs.reduce((counters, doc) => {
        const data = doc.data();
        counters.push(data);
        return counters;
      }, []);
      console.log('Docs', docs);
      response.send(`Size ${query.size}`);
    });
  // response.send('Hello from Cron!');
});

/* exports.expensesUpdated = functions.firestore
  .document('expenses/{userId}')
  .onWrite((event) => {
    // console.log('Event: ', event);
    // console.log('Raw: ', event.data);
    const data = event.data.data();
    console.log('Data: ', data);
    console.log('Params: ', event.params);

    return true; // Return value or promise
    // Update collection 'system'
    // return ref.collection('system').add(data);
  });
 */


// // Listen for changes in all documents and all subcollections
// exports.useMultipleWildcards = functions.firestore
//   .document('users/{userId}/{messageCollectionId}/{messageId}')
//   .onWrite((event) => {
//     // If we set `/users/marie/incoming_messages/134` to {body: "Hello"} then
//     event.params.userId == "malcolm";
//     event.params.messageCollectionId == "incoming_messages";
//     event.params.messageId == "134";
//     // ... and ...
//     event.data.data() == {body: "Hello"}
//   });
//
// exports.sendWelcomeEmail = functions.auth.user().onCreate(event => {
//   const user = event.data; // The Firebase user.
//   const email = user.email; // The email of the user.
//   const displayName = user.displayName; // The display name of the user.
// });

// return event.data.ref.set({
//   olle: 'test'
// }, {merge: true});
