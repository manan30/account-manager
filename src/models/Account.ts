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

export interface AccountDetails {
  account_id: string;
  account_number: string;
  links: AccountDetailsLinks;
  routing_numbers: AccountDetailsRoutingNumbers;
}

export interface AccountDetailsLinks {
  account: string;
  self: string;
}

export interface AccountDetailsRoutingNumbers {
  ach: string;
}

export interface Transaction {
  account_id: string;
  amount: string;
  date: string;
  description: string;
  id: string;
  links: TransactionLinks;
  running_balance: string;
  status: string;
  type: string;
  details: TransactionDetails;
}

export interface TransactionDetails {
  processing_status: string;
  category?: string;
  counterparty?: string | { name: string; type: string };
}

export interface TransactionLinks {
  account: string;
  self: string;
}

export const AccountCollection = 'account';
