import React from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import Modal from '../../components/Modal';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { useGlobalDispatch } from '../../providers/GlobalStateProvider';

const UnauthorizedUserModal = () => {
  const history = useHistory();
  const dispatch = useGlobalDispatch();
  const { auth } = useFirebaseContext();

  const handleNavigation = async () => {
    try {
      await auth?.signOut();
      dispatch({ type: 'LOGOUT_USER' });
      history.push('/authentication');
    } catch (err) {
      console.error({ err });
    }
  };

  return (
    <Modal
      isOpen
      onCloseClickHandler={() => {
        return;
      }}
      hideCancelButton
    >
      <div className='flex items-center justify-center flex-col'>
        <div className='text-red-500 mb-4'>
          <MdErrorOutline size={72} />
        </div>
        <div className='text-center mb-4 text-sm'>
          I am sorry but you are currently unauthorized to use this app. Please
          try logging in with the correct email address
        </div>
        {/* <Link to='/authentication' className='mb-4'> */}
        <button
          className='text-blue-600 font-semibold'
          onClick={handleNavigation}
        >
          Login with correct email
        </button>
        {/* </Link> */}
      </div>
    </Modal>
  );
};

export default UnauthorizedUserModal;
