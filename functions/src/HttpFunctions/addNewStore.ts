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
      return res.status(400).send({ error: 'Store name cannot be empty' });

    const storesDocRef = db.collection('stores');

    if (storesDocRef) {
      const existingStore = (await storesDocRef.get()).docs.some(
        (doc) => doc.data().name.toLowerCase() === storeName.toLowerCase()
      );
      if (existingStore)
        return res.status(400).send({ error: 'Store already exists' });
    }

    const docRef = await storesDocRef.add({ name: storeName });

    return res
      .status(200)
      .send({ success: `Document written successfully: ${docRef.id}` });
  } catch (err) {
    console.error({ err });
    return res.status(500).send({ error: err.toString() });
  }
});

export const addNewStore = functions.https.onRequest(expressApp);
