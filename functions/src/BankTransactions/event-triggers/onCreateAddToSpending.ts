import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {
  BankTransaction,
  BankTransactionCollection
} from '../interfaces/bankTransaction.model';
import { Spending } from '../../Spending/interfaces/spending.model';

if (!admin.apps.length) {
  admin.initializeApp();
} else {
  admin.app();
}

const db = admin.firestore();

export const onCreateAddToSpending = functions.firestore
  .document(`${BankTransactionCollection}/id`)
  .onCreate(async (snapshot) => {
    try {
      const data = snapshot.data() as BankTransaction;
      const id = snapshot.id;

      const detailsPresent = data.transaction.details?.counterparty;
      const formattedName =
        typeof data.transaction.details?.counterparty === 'object'
          ? data.transaction.details?.counterparty?.name
          : data.transaction.details?.counterparty;

      const timestamp = admin.firestore.Timestamp.now();

      const spendingEntry = {
        date: admin.firestore.Timestamp.fromDate(
          new Date(data.transaction.date)
        ),
        category: data.transaction?.details?.category ?? 'Other',
        amount: Math.abs(Number(data.transaction.amount)),
        storeName: detailsPresent
          ? formattedName
          : data.transaction.description,
        createdAt: timestamp,
        updatedAt: timestamp
      } as Spending;

      await db.collection()
      // await db.collection('transaction').add({
      //   transactionType: 'Spending',
      //   transactionEntity: id,
      //   amount: data.amount,
      //   transactionDate: data.createdAt,
      //   createdAt: admin.firestore.Timestamp.now()
      // } as ITransaction);
    } catch (e) {
      // TODO: Send some notification when this happens
      console.error(e);
    }
  });
