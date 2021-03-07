import { Timestamp } from '@firebase/firestore-types';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

export interface Account extends DocumentSnapshot {
  id: string;
  requestId: string;
  accessToken: string;
  itemId: string;
  userID: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
