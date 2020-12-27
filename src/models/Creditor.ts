import { Timestamp } from '@firebase/firestore-types';
export interface ICreditor {
  id?: string;
  name: string;
  amount: number;
  currency: string;
  remainingAmount: number;
  accountSettledOn?: Timestamp | null;
  accountSettled: boolean;
  convertedAmount?: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
