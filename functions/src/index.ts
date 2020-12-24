import * as functions from 'firebase-functions';

export const updateCreditor = functions.firestore
  .document('transaction/{id}')
  .onCreate((snapshot, context) => {
    const data = snapshot.data();
    console.log({ data });
    // if (data.type === 'Credit' || data.type === 'Debit') {
    // }
  });
