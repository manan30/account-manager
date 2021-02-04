import { ISpending } from 'models/Spending';
import { useMemo, useState } from 'react';

const useLineChart = <T extends ISpending>(data?: Array<T>) => {
  const [isDataFormatted, setIsDataFormatted] = useState(false);

  const formattedData = useMemo(() => {
    setIsDataFormatted(false);
    if (!data?.length) {
      setIsDataFormatted(false);
      return undefined;
    }
    const map = new Map();

    data.sort((a, b) => {
      return (
        new Date(a.date.toDate()).valueOf() -
        new Date(b.date.toDate()).valueOf()
      );
    });

    data.forEach((d) => {
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
