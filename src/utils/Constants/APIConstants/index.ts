export const CURRENCY_CONVERSION_ENDPOINT =
  'https://api.frankfurter.app/latest?to=USD&';

export const GEOLOCATION_ENDPOINT = `https://geolocation-db.com/json/${
  import.meta.env.VITE_GEOLOCATION_API_KEY
}`;

export const BASE_FUNCTIONS_ENDPOINT = import.meta.env.PROD
  ? 'https://us-central1-account-manager-41694.cloudfunctions.net'
  : 'http://localhost:5001/account-manager-41694/us-central1';

export const ACCOUNT_FUNCTIONS = `${BASE_FUNCTIONS_ENDPOINT}/accounts`;
