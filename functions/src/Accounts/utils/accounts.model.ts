import { Timestamp } from '@firebase/firestore-types';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

export interface Account extends DocumentSnapshot {
  id: string;
  userId: string;
  tellerUserId: string;
  enrollmentId: string;
  accessToken: string;
  institutionName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const AccountCollection = 'account';
