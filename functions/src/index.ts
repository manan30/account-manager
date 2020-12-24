import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ICreditor } from '../models/Creditor';
import { ITransaction } from '../models/Transaction';

admin.initializeApp();

const db = admin.firestore();

export const updateCreditor = functions.firestore
  .document('transaction/{id}')
  .onCreate(async (snapshot) => {
    const data = snapshot.data() as ITransaction;
    if (data.transactionType === 'Credit' || data.transactionType === 'Debit') {
      const creditorRef = db.collection(`creditor`).doc(data.transactionEntity);
      const creditor = (await creditorRef.get()).data() as ICreditor;

      if (data.transactionType === 'Credit') {
        const newAmount = creditor.amount + data.amount;
        await creditorRef.update({
          amount: newAmount,
          remainingAmount: Number(newAmount.toFixed(2)),
          accountSettled: false,
          updatedAt: admin.firestore.Timestamp.now()
        });
      } else {
        const newRemAmount = Math.abs(creditor.remainingAmount - data.amount);
        const settledCheck = Number(newRemAmount.toFixed(0)) === 0;
        const updatedAt = admin.firestore.Timestamp.now();
        await creditorRef.update({
          remainingAmount: newRemAmount,
          accountSettled: settledCheck,
          accountSettledOn: settledCheck ? updatedAt : null,
          updatedAt
        });
      }
    }
  });
