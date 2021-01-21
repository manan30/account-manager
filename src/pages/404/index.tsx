import React from 'react';
import VoidIcon from '../../assets/svg/void.svg';

const NotFoundPage = () => {
  console.log('here');
  return (
    <div className='h-screen w-screen flex items-center justify-center flex-col'>
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
