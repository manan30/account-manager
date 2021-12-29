import React, { useState } from 'react';
import { MailIcon, PhoneIcon } from '@heroicons/react/solid';
import Modal from '../../../components/Modal/Modal';
import { ReactComponent as GoogleIcon } from '../../../assets/svg/google-icon.svg';
import Button from '../../../components/Button';
import PhoneAuthenticationContent from './PhoneAuthenticationContent';
import PasswordAuthenticationContent from './PasswordAuthenticationContent';
import { useFirebaseContext } from '../../../providers/FirebaseProvider';

type SignInProvider = 'phone' | 'email';

const AuthenticationModal = () => {
  const { auth, authProviders } = useFirebaseContext();
  const [signInProvider, setSignInProvider] = useState<SignInProvider>('phone');

  const toggleSignInProvider = () => {
    setSignInProvider((prevState) =>
      prevState === 'email' ? 'phone' : 'email'
    );
  };

  return (
    <Modal hideCloseIcon>
      <div className='flex flex-col items-center justify-center flex-auto h-full mx-8 my-4 space-y-6'>
        {signInProvider === 'phone' ? <PhoneAuthenticationContent /> : null}
        {signInProvider === 'email' ? <PasswordAuthenticationContent /> : null}

        <hr className='w-full' />

        <Button
          layout='secondary'
          className='flex items-center w-full hover:shadow'
          onClick={toggleSignInProvider}
        >
          {signInProvider === 'email' ? (
            <PhoneIcon className='w-5 h-5 mr-2' />
          ) : (
            <MailIcon className='w-6 h-6 mr-2' />
          )}
          <span className='text-sm font-semibold tracking-wide text-gray-800'>
            Sign in with {signInProvider === 'email' ? 'Phone' : 'Email'}
          </span>
        </Button>

        <Button
          layout='secondary'
          className='flex items-center w-full bg-gray-100 border border-gray-300 border-solid hover:shadow'
          onClick={() => {
            auth.signInWithPopup(authProviders.googleAuthProvider);
          }}
        >
          <div className='w-4 h-4 mr-2'>
            <GoogleIcon />
          </div>
          <span className='text-sm font-semibold tracking-wide'>
            Sign in with Google
          </span>
        </Button>
      </div>
    </Modal>
  );
};

export default AuthenticationModal;
