import React from 'react';
import Modal from '../../components/Modal';
import GoogleIcon from '../../assets/google-icon.svg';

const AuthenticationModal = () => {
  return (
    <Modal
      isOpen
      onCloseClickHandler={() => {
        return;
      }}
    >
      <div className='mx-4 flex flex-col items-center my-4'>
        <button className='w-full shadow rounded-md p-2 flex items-center justify-center'>
          <div className='h-6 w-6 mr-4'>
            <GoogleIcon />
          </div>
          <span className='tracking-wide font-semibold text-sm'>
            Sign in with Google
          </span>
        </button>
      </div>
    </Modal>
  );
};

export default AuthenticationModal;
