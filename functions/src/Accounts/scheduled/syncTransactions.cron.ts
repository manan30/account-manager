import * as functions from 'firebase-functions';

export const syncTransactions = functions.pubsub
  .schedule('every 1 minutes')
  .onRun((context) => console.log({ context }));
