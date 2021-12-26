import React from 'react';
import { UserCircleIcon, PencilIcon } from '@heroicons/react/solid';

type ProfileImageProps = {
  photoURL?: string;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ photoURL }) => {
  return (
    <div className='relative'>
      {photoURL ? (
        <img
          alt='user-profile'
          src={photoURL}
          className='rounded-full h-36 w-36 object-cover'
        />
      ) : (
        <UserCircleIcon className='h-36 w-36 text-gray-400' />
      )}
      <button className='absolute bottom-0 right-0 p-1 rounded-full bg-gray-100 -translate-x-3 -translate-y-2'>
        <PencilIcon className='h-6 w-6 text-gray-800 rotate-270' />
      </button>
    </div>
  );
};

export default ProfileImage;
