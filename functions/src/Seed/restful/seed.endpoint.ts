import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import { SeedRequestBody } from '../interfaces/seed.interface';
import { BankTransactionCollection } from '../../BankTransactions/interfaces/bankTransaction.model';
import { SpendingCollection } from '../../Spending/interfaces/spending.model';

if (!admin.apps.length) admin.initializeApp();
else admin.app();

const db = admin.firestore();

const expressApp = express();
expressApp.use(cors({ origin: true }));

expressApp.post('/', async (req, res) => {
  try {
    const seedOptions = req.body as SeedRequestBody;

    if (
      seedOptions &&
      Object.keys(seedOptions).length === 0 &&
      seedOptions.constructor === Object
    ) {
      return res.status(400).send({
        message: 'No seed options present. Firestore seeding not executed'
      });
    }

    if (seedOptions.bankTransactions) {
      const { clear: clearBankTransactions } = seedOptions.bankTransactions;
      const bankTransactionsDbRef = db.collection(BankTransactionCollection);
      const snapshot = await bankTransactionsDbRef.get();

      if (clearBankTransactions) {
        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      }
    }

    if (seedOptions.spending) {
      const { clear: clearSpending } = seedOptions.spending;
      const spendingDbRef = db.collection(SpendingCollection);

      const snapshot = await spendingDbRef.get();

      if (clearSpending) {
        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      }
    }

    return res.status(201).send({ message: 'Data seeded successfully' });
  } catch (err) {
    return res.status(500).send({ message: 'Firestore seeding failed', err });
  }
});

export const seedData = functions.https.onRequest(expressApp);
