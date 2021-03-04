import { Timestamp } from '@firebase/firestore-types';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

export interface Account extends DocumentSnapshot {
  id: string;
  requestId: string;
  accessToken: string;
  itemId: number;
  userID: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
