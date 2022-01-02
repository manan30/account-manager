import { useEffect, useState } from 'react';
import { TAILWIND_MEDIUM_BREAKPOINT } from './constants';

type WindowSize = { height?: number; width?: number };

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile =
    !!windowSize.width && windowSize.width < TAILWIND_MEDIUM_BREAKPOINT;

  return { windowSize, isMobile };
};
