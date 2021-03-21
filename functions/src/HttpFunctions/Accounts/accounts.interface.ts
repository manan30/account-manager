export interface EnrollmentData {
  userId: string;
  accessToken: string;
  user: {
    id: string;
  };
  enrollment: {
    id: string;
    institution: {
      name: string;
    };
  };
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
