import { DocumentSnapshot, Timestamp } from '@firebase/firestore-types';
import { Transaction } from '../../Accounts/interfaces/accounts.interface';

export interface BankTransaction extends DocumentSnapshot {
  id: string;
  transaction: Transaction;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const BankTransactionCollection = 'bank-transaction';
