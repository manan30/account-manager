import React from 'react';
import Loader from '../Loader';

const ModalFallback = () => {
  return (
    <div className='fixed z-10 inset-0 overflow-y-auto grid place-items-center bg-gray-200 opacity-50'>
      <Loader size={64} />
    </div>
  );
};

export default ModalFallback;
