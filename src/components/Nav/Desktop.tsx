import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { useGlobalState } from '../../providers/GlobalStateProvider';
import { useLogout } from '../../services/firebase/hooks/useLogout';
import { links } from './utils/constants';

const Desktop = () => {
  const { pathname } = useLocation();
  const { user } = useGlobalState();
  const { logout } = useLogout();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const mainElement = document.querySelector('main');

    const scrollHandler = () => {
      if (mainElement && mainElement?.scrollTop > 50) {
        setScrolled(true);
        return;
      }
      setScrolled(false);
    };

    mainElement?.addEventListener('scroll', scrollHandler);

    return () => mainElement?.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 z-50 w-full py-4 px-8 transition-shadow bg-indigo-500 flex text-gray-100',
        scrolled && 'shadow-xl'
      )}
    >
      <Link to='/'>
        <h1 className='text-xl font-medium'>Account Manager</h1>
      </Link>
      <div className='flex items-center ml-auto space-x-3'>
        {links.map(({ to, linkText }) => (
          <Link
            key={linkText}
            to={to}
            className={cn(
              'text-base',
              'hover:opacity-100',
              pathname !== to && 'opacity-50'
            )}
          >
            <span className='text-base'>{linkText}</span>
          </Link>
        ))}
        {user ? (
          <button
            onClick={logout}
            className='text-base opacity-50 hover:opacity-100'
          >
            Logout
          </button>
        ) : null}
      </div>
    </nav>
  );
};

export default Desktop;
