export const CURRENCY_CONVERSION_ENDPOINT =
  'https://api.frankfurter.app/latest?to=USD&';

export const BASE_ENDPOINT = import.meta.env.PROD
  ? 'https://us-central1-account-manager-41694.cloudfunctions.net'
  : 'http://localhost:5001/account-manager-41694/us-central1';

export const ACCOUNT_FUNCTIONS = '/accounts';

const PLAID_FUNCTIONS = `${ACCOUNT_FUNCTIONS}/plaid`;

export const PLAID_CREATE_LINK_TOKEN_ENDPOINT = `${PLAID_FUNCTIONS}/create-link-token`;

export const PLAID_SET_ACCESS_TOKEN_ENDPOINT = `${PLAID_FUNCTIONS}/set-access-token`;

export const PLAID_GET_ACCOUNTS_BY_ACCESS_TOKEN = `${PLAID_FUNCTIONS}/all-accounts`;
