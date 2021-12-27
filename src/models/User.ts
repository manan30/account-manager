import { Timestamp } from '@firebase/firestore-types';

type UserMetadata = {
  lastSignInTime: string;
  creationTime: string;
  lastRefreshTime?: string | null;
};

type UserInfo = {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
};

export interface User {
  id: string;
  uid: string;
  email?: string;
  emailVerified: boolean;
  displayName?: string;
  phoneNumber?: string;
  photoURL?: string;
  disabled: boolean;
  metadata: UserMetadata;
  providerData: Array<UserInfo>;
  tenantId?: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
