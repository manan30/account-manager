import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ICreditor } from '../../models/Creditor';
import { ITransaction } from '../../models/Transaction';

admin.initializeApp();

const db = admin.firestore();

export const updateCreditorOnTransactionAddition = functions.firestore
  .document('transaction/{id}')
  .onCreate(async (snapshot) => {
    try {
      const data = snapshot.data() as ITransaction;
      if (
        data.transactionType === 'Credit' ||
        data.transactionType === 'Debit'
      ) {
        const creditorRef = db
          .collection(`creditor`)
          .doc(data.transactionEntity);
        const creditor = (await creditorRef.get()).data() as ICreditor;

        if (data.transactionType === 'Credit') {
          const newAmount = creditor.amount + data.amount;
          const newRemainingAmount = creditor.remainingAmount + data.amount;
          await creditorRef.update({
            amount: Number(newAmount.toFixed(2)),
            remainingAmount: Number(newRemainingAmount.toFixed(2)),
            accountSettled: false,
            accountSettledOn: null,
            updatedAt: admin.firestore.Timestamp.now()
          } as ICreditor);
        } else {
          const newRemAmount = Math.abs(creditor.remainingAmount - data.amount);
          const settledCheck = Number(newRemAmount.toFixed(0)) === 0;
          const updatedAt = admin.firestore.Timestamp.now();
          await creditorRef.update({
            remainingAmount: Number(newRemAmount.toFixed(2)),
            accountSettled: settledCheck,
            accountSettledOn: settledCheck ? updatedAt : null,
            updatedAt
          } as ICreditor);
        }
      }
    } catch (e) {
      // TODO: Send some notification when this happens
      console.error(e);
    }
  });
