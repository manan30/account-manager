import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

const links = [
  { to: '/', linkText: 'Overview' },
  { to: '/accounts', linkText: 'Accounts' },
  { to: '/debt', linkText: 'Debt' },
  { to: '/spending', linkText: 'Spending' }
];

function SideNav() {
  const { pathname } = useLocation();

  return (
    <div className='bg-gray-300 px-8 flex flex-col'>
      <h2 className='text-3xl mt-6 text-gray-800'>Account Manager</h2>
      <nav className='flex flex-col flex-auto'>
        {links.map((link, i) => {
          const key = i;
          return (
            <Link
              key={key}
              to={link.to}
              className={cn(
                'mt-5 text-xl text-indigo-600',
                'hover:opacity-100',
                pathname !== link.to && 'opacity-50'
              )}
            >
              {link.linkText}
            </Link>
          );
        })}
      </nav>
      <Link
        to='/new-transaction'
        className='w-full block text-center text-xl text-gray-300 mb-3 bg-gray-700 p-1 rounded'
      >
        New Transaction
      </Link>
    </div>
  );
}

export default SideNav;
