import { useLayoutEffect, useRef, useState } from 'react';

const useChartWidth = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | undefined>();

  useLayoutEffect(() => {
    if (chartContainerRef.current) {
      setWidth(chartContainerRef.current.offsetWidth);
    }
  }, [chartContainerRef]);

  return { width, chartContainerRef };
};

export default useChartWidth;
