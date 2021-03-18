import { Timestamp } from '@firebase/firestore-types';

export interface Account {
  id: string;
  userId: string;
  tellerUserId: string;
  enrollmentId: string;
  accessToken: string;
  institutionName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface AccountsResponse {
  currency_code: string;
  enrollment_id: string;
  id: string;
  institution: Institution;
  last_four: string;
  links: Links;
  name: string;
  subtype: string;
  type: string;
}

export interface Institution {
  id: string;
  name: string;
}

export interface Links {
  balances: string;
  details: string;
  self: string;
  transactions: string;
}

export const AccountCollection = 'account';
