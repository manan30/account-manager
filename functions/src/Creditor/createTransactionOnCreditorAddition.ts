import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ICreditor } from '../../models/Creditor';
import { ITransaction } from '../../models/Transaction';

if (!admin.apps.length) {
  admin.initializeApp();
} else {
  admin.app();
}

const db = admin.firestore();

export const createTransactionOnCreditorAddition = functions.firestore
  .document('creditor/{id}')
  .onCreate(async (snapshot) => {
    try {
      const data = snapshot.data() as ICreditor;
      const id = snapshot.id;

      await db.collection('transaction').add({
        transactionType: 'Creditor Added',
        transactionEntity: id,
        amount: data.amount,
        transactionDate: data.createdAt,
        createdAt: admin.firestore.Timestamp.now()
      } as ITransaction);
    } catch (e) {
      // TODO: Send some notification when this happens
      console.error(e);
    }
  });
