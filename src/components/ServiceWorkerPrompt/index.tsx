import React from 'react';
import { XCircleIcon } from '@heroicons/react/solid';
import { useRegisterSW } from 'virtual:pwa-register/react';
import Toast from '../Toast';

const ServiceWorkerPrompt = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered', { ...r });
    },
    onRegisterError(error) {
      console.error('SW registration error', error);
    }
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return offlineReady || needRefresh ? (
    <Toast autoDismiss={false}>
      <div className='flex items-center'>
        <div className='text-xs text-gray-100 md:text-sm'>
          {offlineReady ? <span>App ready to work offline</span> : null}
          {needRefresh ? (
            <span>
              New content available, click on reload button to update.
            </span>
          ) : null}
        </div>
        <div className='flex items-center ml-auto'>
          {needRefresh ? (
            <button
              className='mx-4 text-xs text-green-200 md:text-xs'
              onClick={() => {
                updateServiceWorker(true);
                close();
              }}
            >
              Reload
            </button>
          ) : null}
          <button
            className='w-4 h-4 rounded-full md:h-6 md:w-6'
            onClick={close}
          >
            <XCircleIcon className='w-full h-full text-gray-100' />
          </button>
        </div>
      </div>
    </Toast>
  ) : null;
};

export default ServiceWorkerPrompt;
