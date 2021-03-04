import { Timestamp } from '@firebase/firestore-types';

export interface Account {
  id: string;
  requestId: string;
  accessToken: string;
  itemId: string;
  userID: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
