import React, { useEffect } from 'react';
import useFirestoreCreateQuery from '../../../hooks/Firestore/useFirestoreCreateQuery';
import { ITransaction } from '../../../models/Transaction';
import { useFirebaseContext } from '../../../providers/FirebaseProvider';
import { useNotificationDispatch } from '../../../providers/NotificationProvider';
import { NOTIFICATION_THEME_SUCCESS } from '../../../utils/Constants/ThemeConstants';
import Button from '../../../components/Button';
import Input from '../../../components/Input/Input';
import Modal from '../../../components/Modal/Modal';
import Select from '../../../components/Select/Select';
import { useForm } from '../../../hooks/Form/useForm';
import { NewTransactionFormFields } from '../interfaces';
import { NewTransactionFormFields as formFields } from '../utils/constants';

type NewTransactionProps = {
  transactionEntity?: { name?: string; id?: string };
  handleClose: () => void;
};

const NewTransaction: React.FC<NewTransactionProps> = ({
  transactionEntity,
  handleClose
}) => {
  const { firestoreTimestamp } = useFirebaseContext();
  const notificationDispatch = useNotificationDispatch();
  const [addNewTransactionMutation, { isLoading }] = useFirestoreCreateQuery<
    ITransaction
  >({
    collectionName: 'transaction',
    onSuccess: () => {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: 'New Transaction Added',
          theme: NOTIFICATION_THEME_SUCCESS
        }
      });
    },
    onComplete: () => {
      resetForm();
    }
  });
  const { values, errors, setFormValues, setFormErrors, resetForm } = useForm<
    NewTransactionFormFields
  >({
    initialValues: {
      type: '',
      amount: '',
      entity: '',
      date: ''
    }
  });

  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const formErrors: Array<string> = [];
    const { amount, date, entity, type } = values;

    [{ amount }, { entity }, { type }].forEach((item) => {
      const [key, value] = Object.entries(item)[0];
      if (value.trim() === '') formErrors.push(key);
    });

    if (formErrors.length) {
      setFormErrors(formErrors);
      return;
    }

    await addNewTransactionMutation({
      transactionType: type.trim(),
      transactionEntity: entity.trim(),
      amount: Number(amount.trim()),
      transactionDate: firestoreTimestamp.fromDate(new Date(date)),
      createdAt: firestoreTimestamp.now()
    } as ITransaction);
  };

  useEffect(() => {
    if (transactionEntity) {
      setFormValues('entity', transactionEntity.name ?? '');
    }
  }, [setFormValues, transactionEntity]);

  return (
    <Modal title='Add New Transaction' hideCloseIcon>
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
                      setFormValues(name as NewTransactionFormFields, value)
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
                    disabled={isLoading || field.name === 'entity'}
                    placeholder={field.placeholder}
                    onChange={(name, value) =>
                      setFormValues(name as NewTransactionFormFields, value)
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

export default NewTransaction;
