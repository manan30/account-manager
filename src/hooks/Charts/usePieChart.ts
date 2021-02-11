import { useMemo, useState } from 'react';
import { ISpending } from '../../models/Spending';
import { spendingCategoryColorMapping } from '../../utils/Functions';

const usePieChart = (
  data?: Array<ISpending> | undefined,
  monthYear?: string
) => {
  const [isDataFormatted, setIsDataFormatted] = useState(false);

  const formattedData = useMemo(() => {
    setIsDataFormatted(false);
    if (!data?.length || !monthYear) {
      setIsDataFormatted(false);
      return undefined;
    }
    const map = new Map();

    const currentMonthYearData = data.filter((datum) => {
      const dMonthYear = new Intl.DateTimeFormat('en-US', {
        month: 'numeric',
        year: '2-digit'
      }).format(datum.date.toDate());
      return dMonthYear === monthYear;
    });

    currentMonthYearData.forEach(({ amount, category }) => {
      map.set(category, map.get(category) + amount || amount);
    });

    setIsDataFormatted(true);
    return [...map].map(([key, value]) => ({
      x: key,
      y: value,
      fill: spendingCategoryColorMapping(key)
    }));
  }, [data, monthYear]);

  return {
    formattedData,
    isDataFormatted
  };
};

export default usePieChart;
