import React from 'react';
import VoidIcon from '../../assets/svg/void.svg';

const NotFoundPage = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center flex-col absolute z-10 inset-0 bg-red-500'>
      <div className='w-20 h-20'>
        <VoidIcon />
      </div>
      <div>It looks like you have come across a void and dark page</div>
      <span>
        But don&apos;t worry you can always go back to where is all started
      </span>
    </div>
  );
};

export default NotFoundPage;
