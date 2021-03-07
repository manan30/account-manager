export type CreateLinkTokenRequestBody = {
  userId: string;
};

export type ExchangePublicTokenRequestBody = {
  publicToken: string;
  userId: string;
};
