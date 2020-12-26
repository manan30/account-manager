import React from 'react';
import { useQuery } from 'react-query';
import { convertAmountToUSD } from '../../api';

type CurrencyConversionCellProps = {
  currency?: string;
  amount?: number;
};

const CurrencyConversionCell: React.FC<CurrencyConversionCellProps> = ({
  currency,
  amount
}) => {
  const {} = useQuery('ConvertAmount');
  return <div />;
};

export default CurrencyConversionCell;
