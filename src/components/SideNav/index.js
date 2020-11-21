import React from 'react';
import { Link } from 'react-router-dom';

const links = [
  { to: '/', linkText: 'Overview' },
  { to: '/accounts', linkText: 'Accounts' },
  { to: '/debt', linkText: 'Debt' },
  { to: '/spending', linkText: 'Spending' }
];

function SideNav() {
  return (
    <div className='bg-gray-300 px-8'>
      <h2 className='text-3xl mt-6 text-gray-800'>Account Manager</h2>
      <nav className='flex flex-col'>
        {links.map((link) => (
          <Link to={link.to} className='mt-5 text-xl text-indigo-600'>
            {link.linkText}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default SideNav;
