import React, { useState } from 'react';
import Modal from '../../components/Modal';
import { useFirebaseContext } from '../../providers/FirebaseProvider';

const Authentication = () => {
  const { authProviders, auth } = useFirebaseContext();
  const [showModal, setShowModal] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const googleAuthProvider = new authProviders!.GoogleAuthProvider();
  googleAuthProvider.addScope('profile');
  googleAuthProvider.addScope('email');

  const handleGoogleAuthProviderClick = async () => {
    const result = await auth?.signInWithPopup(googleAuthProvider);
    const user = result?.user;
    const credential = result?.credential;
    console.log({ user, credential });
  };

  return (
    <Modal isOpen={showModal} onCloseClickHandler={() => 'ABCD'}>
      <div className='mx-4 flex flex-col items-center my-4'>
        <button
          className='w-full border-gray-500 border border-solid shadow rounded-md p-2'
          onClick={() => handleGoogleAuthProviderClick()}
        >
          Google
        </button>
        <button className='w-full border-gray-500 border border-solid shadow rounded-md p-2 mt-3'>
          Twitter
        </button>
        <button className='w-full border-gray-500 border border-solid shadow rounded-md p-2 mt-3'>
          Username/Password
        </button>
        <button className='w-full border-gray-500 border border-solid shadow rounded-md p-2 mt-3'>
          Phone
        </button>
      </div>
    </Modal>
  );
};

export default Authentication;
