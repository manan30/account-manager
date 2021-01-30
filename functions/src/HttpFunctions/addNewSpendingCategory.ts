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
    const { categoryName } = req.body;
    if (!categoryName || categoryName.trim() === '')
      return res.status(400).send({ error: 'Category name cannot be empty' });

    const spendingCategoriesDocRef = db.collection('spending-categories');

    if (spendingCategoriesDocRef) {
      const existingCategory = (await spendingCategoriesDocRef.get()).docs.some(
        (doc) => doc.data().name.toLowerCase() === categoryName.toLowerCase()
      );
      if (existingCategory)
        return res.status(400).send({ error: 'Category already exists' });
    }

    const docRef = await spendingCategoriesDocRef.add({ name: categoryName });

    return res
      .status(200)
      .send({ success: `Document written successfully: ${docRef.id}` });
  } catch (err) {
    console.error({ err });
    return res.status(500).send({ error: err.toString() });
  }
});

export const addNewSpendingCategory = functions.https.onRequest(expressApp);
