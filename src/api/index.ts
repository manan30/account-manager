import { CURRENCY_CONVERSION_ENDPOINT } from '../utils/Constants/APIConstants';

export const convertAmountToUSD = async (
  currency?: string,
  amount?: number
) => {
  const response = await fetch(
    `${CURRENCY_CONVERSION_ENDPOINT}from=${currency}&amount=${amount}`,
    { method: 'GET' }
  );

  if (!response.ok || response.status !== 200) {
    throw new Error('Unable to fetch data');
  }

  return response.json();
};
