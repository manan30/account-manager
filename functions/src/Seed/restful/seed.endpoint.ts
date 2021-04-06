import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import { SeedRequestBody } from '../interfaces/seed.interface';
import { generateFakeCreditor } from '../utils/generateFakeData';
import { BankTransactionCollection } from '../../BankTransactions/interfaces/bankTransaction.model';
import { SpendingCollection } from '../../Spending/interfaces/spending.model';
import { CreditorCollection } from '../../Creditor/interfaces/creditor.model';

if (!admin.apps.length) admin.initializeApp();
else admin.app();

const db = admin.firestore();

const expressApp = express();
expressApp.use(cors({ origin: true }));

expressApp.post('/', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res
      .status(500)
      .send({ message: 'Seeding is not allowed in production' });
  }

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

    if (seedOptions.creditor) {
      const { clear: clearCreditors, count } = seedOptions.creditor;
      const creditorDbRef = db.collection(CreditorCollection);
      const creditorDbSnapshot = await creditorDbRef.get();

      if (clearCreditors) {
        const batch = db.batch();
        creditorDbSnapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      }

      const creditorsCount = count ?? 10;
      const batch = db.batch();

      for (let i = 0; i < creditorsCount; i += 1) {
        const creditor = generateFakeCreditor();
        const id = db.collection(CreditorCollection).doc().id;
        const docRef = db.collection(CreditorCollection).doc(id);
        batch.set(docRef, creditor);
      }

      await batch.commit();
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
