import { Timestamp } from '@firebase/firestore-types';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

export interface ICreditor extends DocumentSnapshot {
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
