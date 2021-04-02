import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {
  BankTransaction,
  BankTransactionCollection
} from '../interfaces/bankTransaction.model';
import {
  Spending,
  SpendingCollection
} from '../../Spending/interfaces/spending.model';
import { chargesType } from '../utils';

if (!admin.apps.length) {
  admin.initializeApp();
} else {
  admin.app();
}

const db = admin.firestore();

export const onCreateAddToSpending = functions.firestore
  .document(`${BankTransactionCollection}/{id}`)
  .onCreate(async (snapshot) => {
    try {
      const data = snapshot.data() as BankTransaction;

      const detailsPresent = data.transaction.details?.counterparty;
      const formattedName =
        typeof data.transaction.details?.counterparty === 'object'
          ? data.transaction.details?.counterparty?.name
          : data.transaction.details?.counterparty;

      const timestamp = admin.firestore.Timestamp.now();

      if (chargesType.includes(data.transaction.type)) {
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

        await db.collection(SpendingCollection).add(spendingEntry);
      }
    } catch (e) {
      console.error(e);
    }
  });
