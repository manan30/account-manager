import React, { useState } from 'react';
import { LogoutIcon } from '@heroicons/react/outline';
import { useWindowSize } from '../../hooks/Device/useWindowSize';
import { useGlobalState } from '../../providers/GlobalStateProvider';
import ModalFallback from '../ModalFallback';

const LogoutModal = React.lazy(() => import('./LogoutModal'));

const Logout = () => {
  const { user } = useGlobalState();
  const { isMobile } = useWindowSize();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      {user ? (
        <button
          onClick={() => setShowLogoutModal(true)}
          className='flex flex-col items-center space-y-2 text-base opacity-50 hover:opacity-100'
        >
          {isMobile ? (
            <LogoutIcon className='w-6 h-6 sm:w-8 sm:h-8' />
          ) : (
            'Logout'
          )}
          {/* <span className='text-xs'>Logout</span> */}
        </button>
      ) : null}
      <React.Suspense fallback={<ModalFallback />}>
        {showLogoutModal ? (
          <LogoutModal handleClose={() => setShowLogoutModal(false)} />
        ) : null}
      </React.Suspense>
    </>
  );
};

export default Logout;
