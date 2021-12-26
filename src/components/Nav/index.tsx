import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoutIcon } from '@heroicons/react/outline';
import cn from 'classnames';
import { useEffect } from 'react';
import { useState } from 'react';
import { useGlobalState } from '../../providers/GlobalStateProvider';
import { useLogout } from '../../services/firebase/hooks/useLogout';

const links = [
  { to: '/accounts', linkText: 'Accounts' },
  { to: '/expenses', linkText: 'Expenses' },
  { to: '/creditors', linkText: 'Creditors' },
  { to: '/recurring', linkText: 'Recurring' },
  { to: '/profile', linkText: 'Profile' }
];

const Nav = () => {
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

  const renderLinks = () => {
    return links
      .map((link) => {
        return link.linkText !== 'Profile' ||
          (link.linkText === 'Profile' && user) ? (
          <Link
            key={link.linkText}
            to={link.to}
            className={cn(
              'text-base',
              'hover:opacity-100',
              pathname !== link.to && 'opacity-50'
            )}
          >
            <li>{link.linkText}</li>
          </Link>
        ) : null;
      })
      .filter(Boolean);
  };

  return (
    <nav
      className={cn(
        'flex items-center p-6 transition-shadow z-50 bg-indigo-600 text-gray-100',
        scrolled && 'shadow-xl'
      )}
    >
      <Link to='/'>
        <h1 className='text-xl font-medium'>Account Manager</h1>
      </Link>
      <ul className='flex items-center ml-auto space-x-3'>
        {renderLinks()}
        {user ? (
          <button onClick={logout} className='text-base'>
            <LogoutIcon className='h-5 w-5 opacity-50 hover:opacity-100' />
          </button>
        ) : null}
      </ul>
    </nav>
  );
};

export default Nav;
