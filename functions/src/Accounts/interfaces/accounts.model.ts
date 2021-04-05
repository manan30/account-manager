import { DocumentSnapshot, Timestamp } from '@firebase/firestore-types';

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
