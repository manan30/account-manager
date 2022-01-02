import React from 'react';
import { useLogout } from '../../services/firebase/hooks/useLogout';
import Button from '../Button';
import Modal from '../Modal/Modal';

type LogoutModalProps = {
  handleClose: () => void;
};

const LogoutModal: React.FC<LogoutModalProps> = ({ handleClose }) => {
  const { loading, logout } = useLogout();

  return (
    <Modal title='Logout Confirmation' size='small' hideCloseIcon>
      <div className='text-sm text-gray-600 md:text-base'>
        Are you sure you want to logout?
      </div>
      <div className='flex items-center justify-end w-full pr-1 mt-8 mb-2 space-x-3'>
        <Button layout='secondary' disabled={loading} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          loading={loading}
          onClick={() => {
            logout();
            handleClose();
          }}
        >
          Logout
        </Button>
      </div>
    </Modal>
  );
};

export default LogoutModal;
