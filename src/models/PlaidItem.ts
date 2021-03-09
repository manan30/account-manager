import { Timestamp } from '@firebase/firestore-types';

export interface PlaidItem {
  id: string;
  requestId: string;
  accessToken: string;
  itemId: string;
  userID: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
