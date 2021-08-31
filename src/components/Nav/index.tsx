import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

const links = [
  { to: '/accounts', linkText: 'Accounts' },
  { to: '/expenses', linkText: 'Expenses' },
  { to: '/creditors', linkText: 'Creditors' },
  { to: '/recurring', linkText: 'Recurring' }
];

const SideNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className={'flex items-center p-6'}>
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

export default SideNav;
