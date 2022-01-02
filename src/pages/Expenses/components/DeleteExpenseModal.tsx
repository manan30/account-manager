import React from 'react';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal/Modal';
import useFirestoreDeleteQuery from '../../../hooks/Firestore/useFirestoreDeleteQuery';
import { useNotificationDispatch } from '../../../providers/NotificationProvider';
import { ADD_NOTIFICATION } from '../../../reducers/NotificationReducer/notificationReducer.interface';
import {
  NOTIFICATION_THEME_FAILURE,
  NOTIFICATION_THEME_SUCCESS
} from '../../../utils/Constants/ThemeConstants';

type DeleteExpenseModalProps = {
  deleteDoc?: { id: string; name: string };
  handleClose: () => void;
};

const DeleteExpenseModal: React.FC<DeleteExpenseModalProps> = ({
  deleteDoc,
  handleClose
}) => {
  const notificationDispatch = useNotificationDispatch();
  const {
    isLoading: isDocumentBeingDeleted,
    mutation: deleteSpendingEntryMutation
  } = useFirestoreDeleteQuery({
    id: deleteDoc?.id ?? '',
    collectionName: 'spending',
    onSuccess: () => {
      notificationDispatch({
        type: ADD_NOTIFICATION,
        payload: {
          content: `Expense deleted successfully!`,
          theme: NOTIFICATION_THEME_SUCCESS
        }
      });
    },
    onError: () => {
      notificationDispatch({
        type: ADD_NOTIFICATION,
        payload: {
          content: `There was an error while deleting expense: ${deleteDoc?.name}`,
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
    },
    onComplete: handleClose
  });

  return (
    <Modal title='Delete Expense' hideCloseIcon>
      <div className='text-sm md:text-base'>
        Are you sure you want to delete <strong>{deleteDoc?.name}</strong>?
      </div>
      <div className='flex items-center justify-end w-full pr-1 mt-8 mb-2 space-x-3'>
        <Button
          layout='secondary'
          disabled={isDocumentBeingDeleted}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          loading={isDocumentBeingDeleted}
          onClick={deleteSpendingEntryMutation}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteExpenseModal;
