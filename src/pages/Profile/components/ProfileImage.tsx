import React, { useEffect, useRef } from 'react';
import { UserCircleIcon, PencilIcon } from '@heroicons/react/solid';
import { useUploadImage } from '../../../hooks/Cloudinary/useUploadImage';
import useFirestoreUpdateQuery from '../../../hooks/Firestore/useFirestoreUpdateQuery';
import { User } from '../../../models/User';

type ProfileImageProps = {
  photoURL?: string;
  id?: string;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ id, photoURL }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateProfileImageMutation] = useFirestoreUpdateQuery<User>({
    collectionName: 'user'
  });
  const { handleImageUpload: handleUpload, data, loading } = useUploadImage();

  const handleUploadButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleUpload(selectedFile);
    }
  };

  useEffect(() => {
    if (data && id) {
      updateProfileImageMutation(id, { photoURL: data.url });
    }
  }, [data, id, updateProfileImageMutation]);

  return (
    <div className='relative'>
      <input
        type='file'
        className='hidden'
        ref={fileInputRef}
        accept='image/*'
        onChange={handleImageUpload}
      />
      {photoURL ? (
        <img
          alt='user-profile'
          src={photoURL}
          className='object-cover rounded-full h-36 w-36'
        />
      ) : (
        <UserCircleIcon className='text-gray-400 h-36 w-36' />
      )}
      <button
        className='absolute bottom-0 right-0 p-1 -translate-x-3 -translate-y-2 bg-gray-100 rounded-full shadow-md'
        onClick={handleUploadButtonClick}
        disabled={loading}
      >
        <PencilIcon className='w-6 h-6 text-gray-800 rotate-270' />
      </button>
    </div>
  );
};

export default ProfileImage;
