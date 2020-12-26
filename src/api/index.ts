import { CURRENCY_CONVERSION_ENDPOINT } from '../utils/Constants/APIConstants';

export const convertAmountToUSD = async (
  currency?: string,
  amount?: number
) => {
  const response = await fetch(
    `${CURRENCY_CONVERSION_ENDPOINT}from=${currency}&amount=${amount}`
  );
  if (response.status === 200) {
    const data = await response.json();
    console.log({ data });
  }
};
