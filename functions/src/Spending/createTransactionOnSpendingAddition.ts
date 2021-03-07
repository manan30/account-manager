import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ISpending } from '../../models/Spending';
import { ITransaction } from '../../models/Transaction';

if (!admin.apps.length) {
  admin.initializeApp();
} else {
  admin.app();
}

const db = admin.firestore();

export const createTransactionOnSpendingAddition = functions.firestore
  .document('spending/{id}')
  .onCreate(async (snapshot) => {
    try {
      const data = snapshot.data() as ISpending;
      const id = snapshot.id;

      await db.collection('transaction').add({
        transactionType: 'Spending',
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
