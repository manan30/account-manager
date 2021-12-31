import React from 'react';
import { useWindowSize } from '../../hooks/Device/useWindowSize';

const Desktop = React.lazy(() => import('./Desktop'));
const Mobile = React.lazy(() => import('./Mobile'));

const Nav = () => {
  const windowSize = useWindowSize();

  const isMobile = windowSize.width && windowSize.width < 768;

  return (
    <React.Suspense fallback={null}>
      {isMobile ? <Mobile /> : <Desktop />}
    </React.Suspense>
  );
};

export default Nav;
