import { useEffect, useState } from 'react';
import { IExpense } from '../../models/Expense';
import { spendingCategoryColorMapping } from '../../utils/Functions';

const usePieChart = (
  data?: Array<IExpense> | undefined,
  monthYear?: string,
  showPieChart?: boolean
) => {
  const [isDataFormatted, setIsDataFormatted] = useState(false);
  const [formattedData, setFormattedData] = useState<
    {
      x: string;
      y: string;
      fill: string;
    }[]
  >([]);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
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
    setFormattedData(
      [...map].map(([key, value]) => ({
        x: key,
        y: value,
        fill: spendingCategoryColorMapping(key)
      }))
    );
  }, [data, monthYear]);

  useEffect(() => {
    if (showPieChart) {
      setAngle(0);
      setTimeout(() => {
        setAngle(360), 1000;
      });
    }
  }, [showPieChart]);

  return {
    formattedData,
    isDataFormatted,
    angle
  };
};

export default usePieChart;
