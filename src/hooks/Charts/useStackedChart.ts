import { ISpending } from 'models/Spending';
import { useMemo, useState } from 'react';

const useStackedChart = <T extends ISpending>(data?: Array<T>) => {
  const [isDataFormatted, setIsDataFormatted] = useState(false);
  const categories: string[] = useMemo(() => [], []);

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
      if (map.has(key)) {
        const value = map.get(key);
        if (value[d.category]) value[d.category] += d.amount;
        else value[d.category] = d.amount;
      } else {
        const value = { [d.category]: d.amount };
        map.set(key, value);
      }
      categories.push(d.category);
    });

    console.log({ map });

    setIsDataFormatted(true);

    return [...map.entries()].map(([key, value]) => {
      const formattedValue = Object.entries(value).map(([k, v]) => ({
        x: k,
        y: v
      }));
      return { key, value: formattedValue };
    });
  }, [data, categories]);

  console.log({ formattedData });

  return {
    formattedData,
    isDataFormatted,
    categories: [...new Set(categories)]
  };
};

export default useStackedChart;
