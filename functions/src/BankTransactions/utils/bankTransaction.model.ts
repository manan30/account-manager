import { Timestamp } from '@firebase/firestore-types';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { Transaction } from '../../Accounts/utils/accounts.interface';

export interface BankTransaction extends DocumentSnapshot {
  id: string;
  transaction: Transaction;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const BankTransactionCollection = 'bank-transaction';
