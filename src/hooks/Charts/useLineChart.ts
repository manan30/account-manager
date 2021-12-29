import { useMemo, useState } from 'react';
import { IExpense } from '../../models/Expense';

const useLineChart = <T extends IExpense>(data?: Array<T>) => {
  const [isDataFormatted, setIsDataFormatted] = useState(false);

  const formattedData = useMemo(() => {
    setIsDataFormatted(false);
    if (!data?.length) {
      setIsDataFormatted(false);
      return undefined;
    }
    const map = new Map();

    const sortedData = data.slice().sort((a, b) => {
      return (
        new Date(a.date.toDate()).valueOf() -
        new Date(b.date.toDate()).valueOf()
      );
    });

    sortedData.forEach((d) => {
      const key = new Intl.DateTimeFormat('en-US', {
        month: 'numeric',
        year: '2-digit'
      }).format(d.date.toDate());
      map.set(key, map.get(key) + d.amount || d.amount);
    });

    setIsDataFormatted(true);

    return [...map.entries()].map(([key, value]) => ({
      x: key,
      y: value
    }));
  }, [data]);

  return { formattedData, isDataFormatted };
};

export default useLineChart;
