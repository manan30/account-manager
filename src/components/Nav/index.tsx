import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

const links = [
  { to: '/', linkText: 'Overview' },
  // { to: '/debt', linkText: 'Debt' },
  { to: '/accounts', linkText: 'Accounts' },
  // TODO: Rename spending to expenses
  { to: '/spending', linkText: 'Spending' },
  { to: '/creditors', linkText: 'Creditors' },
  { to: '/transactions', linkText: 'Transactions' },
  { to: '/recurring', linkText: 'Recurring' }
];

const SideNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className={'border-red-500'}>
      <h2>Account Manager</h2>
      <nav>
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
      {/* <Link
        to='/new-transaction'
        className='block w-full p-1 mb-3 text-xl text-center text-gray-300 bg-gray-700 rounded'
      >
        New Transaction
      </Link> */}
    </nav>
  );
};

export default SideNav;
