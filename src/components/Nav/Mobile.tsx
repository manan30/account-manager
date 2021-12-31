import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useGlobalState } from '../../providers/GlobalStateProvider';
import { useLogout } from '../../services/firebase/hooks/useLogout';
import { links } from './utils/constants';
import { LogoutIcon } from '@heroicons/react/outline';

const Mobile = () => {
  const { pathname } = useLocation();
  const { user } = useGlobalState();
  const { logout } = useLogout();

  return (
    <nav className='fixed bottom-0 left-0 z-50 grid w-full grid-flow-col px-2 py-3 text-gray-100 bg-indigo-600 shadow-md auto-cols-fr'>
      {links.map(({ to, linkText, component: Component }) => (
        <Link
          key={linkText}
          to={to}
          className={cn(
            'text-base',
            'hover:opacity-100',
            pathname !== to && 'opacity-50'
          )}
        >
          <div className='flex flex-col items-center space-y-2'>
            <Component className='w-6 h-6 sm:w-8 sm:h-8' />
            {/* <span className='text-xs'>{linkText}</span> */}
          </div>
        </Link>
      ))}
      {user ? (
        <button
          onClick={logout}
          className='flex flex-col items-center space-y-2 text-base opacity-50 hover:opacity-100'
        >
          <LogoutIcon className='w-6 h-6 sm:w-8 sm:h-8' />
          {/* <span className='text-xs'>Logout</span> */}
        </button>
      ) : null}
    </nav>
  );
};

export default Mobile;
