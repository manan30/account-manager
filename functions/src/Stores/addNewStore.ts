import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

if (!admin.apps.length) admin.initializeApp();
else admin.app();

const db = admin.firestore();

const expressApp = express();
expressApp.use(cors({ origin: true }));
expressApp.post('/', async (req, res) => {
  try {
    const { storeName } = req.body;
    if (!storeName || storeName.trim() === '')
      res.status(400).send({ error: 'Store name cannot be empty' });

    await db.collection('stores').add(storeName);

    res.status(200).send({ message: 'New store was added successfully' });
  } catch (err) {
    console.error({ err });
    res.status(500).send({ error: err.toString() });
  }
});

export const addNewStore = functions.https.onRequest(expressApp);
