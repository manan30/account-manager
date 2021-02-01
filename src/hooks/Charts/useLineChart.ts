import { useMemo, useState } from 'react';

const useLineChart = <T>(data: Array<T>) => {
  const [isDataFormatted, setIsDataFormatted] = useState(false);

  const formattedData = useMemo(() => {
    setIsDataFormatted(false);
    if (!data.length) return {};
    console.log({ data });
    return {};
  }, [data]);

  return { formattedData, isDataFormatted };
};

export default useLineChart;
