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
    <div className='bg-gray-300 px-8'>
      <h2 className='text-3xl mt-6 text-gray-800'>Account Manager</h2>
      <nav className='flex flex-col'>
        {links.map((link) => (
          <Link
            to={link.to}
            className={cn(
              'mt-5 text-xl text-indigo-600',
              'hover:opacity-100',
              pathname !== link.to && 'opacity-50'
            )}
          >
            {link.linkText}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default SideNav;
