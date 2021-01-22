import React from 'react';
import { Link } from 'react-router-dom';
import VoidIcon from '../../assets/svg/void.svg';

const NotFoundPage = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center flex-col absolute z-10 inset-0 bg-red-500'>
      <div className='w-64 h-64 mb-16'>
        <VoidIcon />
      </div>
      <div className='tracking-wide text-2xl text-gray-200 mb-4'>
        It looks like you have come across a void and quiet page
      </div>
      <span className='text-lg text-gray-200 tracking-wide'>
        But don&apos;t worry you can always go back to where is all{' '}
        <Link to='/' className='text-gray-700 font-medium hover:underline'>
          started
        </Link>
      </span>
    </div>
  );
};

export default NotFoundPage;
