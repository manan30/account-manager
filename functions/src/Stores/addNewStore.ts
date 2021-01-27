import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

if (!admin.apps.length) admin.initializeApp();
else admin.app();

// const db = admin.firestore();

export const addNewStore = functions.https.onRequest(async (req, res) => {
  const { storeName } = req.body;
  if (!storeName || storeName.trim() === '')
    res.status(400).send('Store name cannot be empty');

  console.log({ storeName });
});
