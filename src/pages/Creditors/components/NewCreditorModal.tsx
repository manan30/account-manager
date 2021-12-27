import React, { useCallback } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';
import Select from '../../components/Select/Select';
import useFirestoreCreateQuery from '../../hooks/Firestore/useFirestoreCreateQuery';
import useFirestoreReadQuery from '../../hooks/Firestore/useFirestoreReadQuery';
import { useForm } from '../../hooks/Form/useForm';
import { ICreditor } from '../../models/Creditor';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { useNotificationDispatch } from '../../providers/NotificationProvider';
import {
  NOTIFICATION_THEME_FAILURE,
  NOTIFICATION_THEME_SUCCESS
} from '../../utils/Constants/ThemeConstants';
import { NewCreditorFormFields } from './interfaces';
import { NewCreditorFormFields as formFields } from './utils/constants';

type NewCreditorModalProps = {
  uid: string;
  handleClose: () => void;
};

const NewCreditorModal: React.FC<NewCreditorModalProps> = ({
  uid,
  handleClose
}) => {
  const notificationDispatch = useNotificationDispatch();
  const { firestoreTimestamp } = useFirebaseContext();
  const { data: creditorsData } = useFirestoreReadQuery<ICreditor>({
    collection: 'creditor',
    whereClauses: [['uid', '==', uid]]
  });
  const [addNewCreditorMutation, { isLoading }] = useFirestoreCreateQuery<
    ICreditor
  >({
    collectionName: 'creditor',
    onSuccess: () => {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: 'New Creditor Added',
          theme: NOTIFICATION_THEME_SUCCESS
        }
      });
    },
    onComplete: () => {
      resetForm();
    }
  });

  const { values, errors, setFormValues, setFormErrors, resetForm } = useForm<
    NewCreditorFormFields
  >({
    initialValues: {
      name: '',
      amount: '',
      currency: ''
    }
  });

  const handleSubmit = useCallback(
    async (
      e:
        | React.FormEvent<HTMLFormElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      const formErrors: Array<string> = [];
      const { amount, currency, name } = values;

      [{ amount }, { name }, { currency }].forEach((item) => {
        const [key, value] = Object.entries(item)[0];
        if (value.trim() === '') formErrors.push(key);
      });

      if (formErrors.length) {
        setFormErrors(formErrors);
        return;
      }

      const creditors = creditorsData?.map((creditor) =>
        creditor.name.toLowerCase()
      );

      if (creditors?.includes(name)) {
        notificationDispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            content: `Creditor ${name} already exists. To update the amount please create a new transaction`,
            theme: NOTIFICATION_THEME_FAILURE
          }
        });
        return;
      }

      const timestamp = firestoreTimestamp.now();

      await addNewCreditorMutation({
        uid: uid,
        name: name.trim(),
        amount: Number(amount.trim()),
        currency: currency.trim(),
        remainingAmount: Number(amount.trim()),
        accountSettledOn: null,
        accountSettled: false,
        createdAt: timestamp,
        updatedAt: timestamp
      } as ICreditor);
    },
    [
      uid,
      values,
      creditorsData,
      firestoreTimestamp,
      addNewCreditorMutation,
      notificationDispatch,
      setFormErrors
    ]
  );

  return (
    <Modal title='Add New Creditor' size='medium' hideCloseIcon>
      <form className='w-full' onSubmit={handleSubmit}>
        <div className='flex flex-col space-y-6'>
          {formFields.map((field) => {
            switch (field.type) {
              case 'select':
                return (
                  <Select
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    value={values[field.name]}
                    error={errors[field.name]}
                    placeholder={field.placeholder}
                    disabled={isLoading}
                    options={(field.options as unknown) as string[]}
                    onChange={(name, value) =>
                      setFormValues(name as NewCreditorFormFields, value)
                    }
                  />
                );
              default:
                return (
                  <Input
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    value={values[field.name]}
                    error={errors[field.name]}
                    type={field?.inputType}
                    disabled={isLoading}
                    placeholder={field.placeholder}
                    onChange={(name, value) =>
                      setFormValues(name as NewCreditorFormFields, value)
                    }
                  />
                );
            }
          })}
        </div>
        <div className='flex items-center justify-end w-full pr-1 mt-8 mb-2 space-x-3'>
          <Button layout='secondary' disabled={isLoading} onClick={handleClose}>
            Cancel
          </Button>
          <Button type='submit' loading={isLoading}>
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewCreditorModal;
