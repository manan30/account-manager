import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useEffect } from 'react';
import { useState } from 'react';
import { useGlobalState } from '../../providers/GlobalStateProvider';
import Button from '../Button';
import { useLogout } from '../../services/firebase/hooks/useLogout';

const links = [
  { to: '/accounts', linkText: 'Accounts' },
  { to: '/expenses', linkText: 'Expenses' },
  { to: '/creditors', linkText: 'Creditors' },
  { to: '/recurring', linkText: 'Recurring' }
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
        {links.map((link) => {
          return (
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
          );
        })}
        {user ? <Button onClick={logout}>Logout</Button> : null}
      </ul>
    </nav>
  );
};

export default Nav;
