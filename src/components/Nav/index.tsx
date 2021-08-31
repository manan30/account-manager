import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useEffect } from 'react';
import { useState } from 'react';

const links = [
  { to: '/accounts', linkText: 'Accounts' },
  { to: '/expenses', linkText: 'Expenses' },
  { to: '/creditors', linkText: 'Creditors' },
  { to: '/recurring', linkText: 'Recurring' }
];

const Nav = () => {
  const { pathname } = useLocation();
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
        'flex items-center p-6 transition-shadow z-50',
        scrolled && 'shadow-md'
      )}
    >
      <Link to='/'>
        <h1 className='text-xl font-medium text-indigo-600'>Account Manager</h1>
      </Link>
      <ul className='flex items-center ml-auto space-x-3'>
        {links.map((link) => {
          return (
            <Link
              key={link.linkText}
              to={link.to}
              className={cn(
                'text-base text-indigo-600',
                'hover:opacity-100',
                pathname !== link.to && 'opacity-50'
              )}
            >
              <li>{link.linkText}</li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
