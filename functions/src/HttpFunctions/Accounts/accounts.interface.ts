export interface EnrollmentBody {
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
