import { Timestamp, DocumentSnapshot } from '@firebase/firestore-types';

export interface Creditor extends DocumentSnapshot {
  id: string;
  name: string;
  amount: number;
  currency: string;
  remainingAmount: number;
  accountSettledOn?: string | null;
  accountSettled: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const CreditorCollection = 'creditor';
