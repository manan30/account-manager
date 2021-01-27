import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

if (!admin.apps.length) admin.initializeApp();
else admin.app();

// const db = admin.firestore();

const expressApp = express();
expressApp.use(cors({ origin: true }));
expressApp.post('/', async (req, res) => {
  const { storeName } = req.body;
  if (!storeName || storeName.trim() === '')
    res.status(400).send({ error: 'Store name cannot be empty' });

  console.log({ storeName });
  res.send(200);
});

export const addNewStore = functions.https.onRequest(expressApp);
