import { Timestamp } from '@firebase/firestore-types';

export interface Account {
  id: string;
  requestId: string;
  accessToken: string;
  itemId: number;
  userID: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
