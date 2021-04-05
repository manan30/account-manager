import React from 'react';
import { generateRandomKey } from '../../utils/Functions';

const AccountsLoading = () => {
  return (
    <div className='grid grid-cols-2 grid-rows-4 gap-8 mb-8'>
      {new Array(8).fill(0).map(() => {
        return (
          <div
            key={generateRandomKey()}
            className='shadow-md rounded-md p-4 w-full mx-auto bg-white'
          >
            <div className='animate-pulse flex space-x-4'>
              <div className='flex-1 space-y-4 py-1'>
                <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                <div className='space-y-2'>
                  <div className='h-4 bg-gray-200 rounded'></div>
                  <div className='h-4 bg-gray-200 rounded w-5/6'></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccountsLoading;
