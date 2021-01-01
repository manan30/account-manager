import React from 'react';
import { useQuery } from 'react-query';
import cn from 'classnames';
import { convertAmountToUSD } from '../../api';
import Loader from '../Loader';
import { MdReportProblem } from 'react-icons/md';

type CurrencyConversionCellProps = {
  currency?: string;
  amount?: number;
};

type CurrencyConversionAPIData = {
  amount: number;
  base: string;
  date: Date;
  rates: { USD: number };
};

const CurrencyConversionCell: React.FC<CurrencyConversionCellProps> = ({
  currency,
  amount
}) => {
  const { data, isLoading, isError } = useQuery<CurrencyConversionAPIData>(
    [`Convert${amount}${currency}ToUSD`, currency, amount],
    () => {
      if (currency !== 'USD') return convertAmountToUSD(currency, amount);
      return Promise.resolve();
    },
    { staleTime: 10 * 60 * 1000, retry: 2 }
  );

  if (currency === 'USD')
    return <div className='flex justify-center'>${amount}</div>;

  if (isLoading) return <Loader />;

  return (
    <div className={cn('flex justify-center', isError && 'text-red-600')}>
      {isError ? (
        <MdReportProblem size={24} />
      ) : (
        data && `${'$'.concat(data.rates.USD.toFixed(2))}`
      )}
    </div>
  );
};

export default CurrencyConversionCell;
