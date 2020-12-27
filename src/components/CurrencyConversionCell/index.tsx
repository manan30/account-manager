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

const CurrencyConversionCell: React.FC<CurrencyConversionCellProps> = ({
  currency,
  amount
}) => {
  const { data, isLoading, isError } = useQuery(
    [`Convert${amount}${currency}ToUSD`, currency, amount],
    () => convertAmountToUSD(currency, amount),
    { staleTime: 10 * 60 * 1000 }
  );

  if (isLoading) return <Loader />;

  return (
    <div className={cn('flex justify-center', isError && 'text-red-600')}>
      {isError ? (
        <MdReportProblem size={24} />
      ) : (
        `${'$'.concat(data.rates.USD.toFixed(2))}`
      )}
    </div>
  );
};

export default CurrencyConversionCell;
