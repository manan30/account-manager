import { Timestamp } from '@firebase/firestore-types';

export interface Spending {
  id?: string;
  storeName: string;
  category: string;
  amount: number;
  date: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const SpendingCollection = 'spending';
