import { useQuery } from 'react-query';
import { convertAmountToUSD } from '../../api';
import { USD } from './constants';

type CurrencyConversionAPIData = {
  amount: number;
  base: string;
  date: Date;
  rates: { USD: number };
};

export const useCurrencyConversion = (currency?: string, amount?: number) => {
  const locale = new Intl.NumberFormat('default').resolvedOptions();
  console.log({ locale });
  const { data, isLoading, isError } = useQuery<CurrencyConversionAPIData>(
    [`Convert${amount}${currency}ToUSD`, currency, amount],
    () => {
      if (currency !== USD) return convertAmountToUSD(currency, amount);
      return Promise.resolve();
    },
    {
      staleTime: 10 * 60 * 1000,
      retry: 2,
      enabled: !!(currency && amount && currency !== USD)
    }
  );

  return { data, isLoading, isError };
};
