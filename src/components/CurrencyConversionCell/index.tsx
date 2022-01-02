import React from 'react';
import cn from 'classnames';
import { ExclamationIcon } from '@heroicons/react/solid';
import Loader from '../Loader';
import { useCurrencyConversion } from '../../hooks/Currency/useCurrencyConversion';

type CurrencyConversionCellProps = {
  currency?: string;
  amount?: number;
};

const CurrencyConversionCell: React.FC<CurrencyConversionCellProps> = ({
  currency,
  amount
}) => {
  const { data, isError, isLoading } = useCurrencyConversion();

  if (currency === 'USD')
    return <div className='flex justify-center'>${amount}</div>;

  if (isLoading) return <Loader />;

  return (
    <div className={cn('flex justify-center', isError && 'text-red-600')}>
      {isError ? (
        <ExclamationIcon className='w-6 h-6' />
      ) : data ? (
        `$${data.rates.USD.toFixed(2)}`
      ) : null}
    </div>
  );
};

export default CurrencyConversionCell;
