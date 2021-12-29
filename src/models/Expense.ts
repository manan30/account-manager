import { Timestamp } from '@firebase/firestore-types';

export interface IExpense {
  id?: string;
  storeName: string;
  category: string;
  amount: number;
  date: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
