import React from 'react';
import { Link } from 'react-router-dom';
import { useWindowSize } from '../../hooks/Device/useWindowSize';

const Desktop = React.lazy(() => import('./Desktop'));
const Mobile = React.lazy(() => import('./Mobile'));

const Nav = () => {
  const windowSize = useWindowSize();

  const isMobile = windowSize.width && windowSize.width < 768;

  return (
    <React.Suspense fallback={null}>
      {isMobile ? (
        <>
          <div className='fixed top-0 left-0 w-full px-4 py-2 tracking-wide text-center text-gray-100 bg-indigo-600'>
            <Link to='/'>
              <h1 className='text-xl font-medium'>Account Manager</h1>
            </Link>
          </div>
          <Mobile />
        </>
      ) : (
        <Desktop />
      )}
    </React.Suspense>
  );
};

export default Nav;
