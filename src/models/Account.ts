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

export interface AccountResponse {
  currency_code: string;
  enrollment_id: string;
  id: string;
  institution: AccountInstitution;
  last_four: string;
  links: AccountLinks;
  name: string;
  subtype: string;
  type: string;
}

export interface AccountInstitution {
  id: string;
  name: string;
}

export interface AccountLinks {
  balances: string;
  details: string;
  self: string;
  transactions: string;
}

export interface AccountBalance {
  account_id: string;
  available: string;
  ledger: string;
  links: AccountBalanceLinks;
}

export interface AccountBalanceLinks {
  account: string;
  self: string;
}

export const AccountCollection = 'account';
