import React, { useState } from 'react';
import { FingerPrintIcon } from '@heroicons/react/outline';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal/Modal';
import { useFirebaseContext } from '../../../providers/FirebaseProvider';
import { useNotificationDispatch } from '../../../providers/NotificationProvider';
import { NOTIFICATION_THEME_FAILURE } from '../../../utils/Constants/ThemeConstants';

type PasswordResetModalProps = { email: string; hideModal: () => void };

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  email,
  hideModal
}) => {
  const notificationDispatch = useNotificationDispatch();
  const { auth } = useFirebaseContext();
  const [processing, setProcessing] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const handlePasswordReset = () => {
    setProcessing(true);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setConfirmationModal(true);
      })
      .catch((err) => {
        notificationDispatch({
          type: 'ADD_NOTIFICATION',
          payload: { content: err.message, theme: NOTIFICATION_THEME_FAILURE }
        });
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  return (
    <Modal size='small' title='Forgot Password?' onCloseIconClick={hideModal}>
      <div className='flex flex-col items-center justify-center space-y-6'>
        <FingerPrintIcon className='h-10 w-10 text-red-600 items-center' />
        <p className='text-sm tracking-wide font-medium text-gray-400 text-center mb-6'>
          {confirmationModal
            ? `If the account exists in our system you should receive a password reset email at ${email}. Please follow the link in the email to reset your password`
            : "That's okay, it happens! Click on the button below to reset your password"}
        </p>
        <Button
          layout='primary'
          className='flex items-center w-full hover:shadow'
          type='reset'
          disabled={processing}
          loading={processing}
          onClick={confirmationModal ? hideModal : handlePasswordReset}
        >
          {confirmationModal ? 'Login' : 'Reset Password'}
        </Button>
      </div>
    </Modal>
  );
};

export default PasswordResetModal;
