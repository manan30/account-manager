import React, { useEffect } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input/Input';
import Modal from '../../../components/Modal/Modal';
import Select from '../../../components/Select/Select';
import useFirestoreCreateQuery from '../../../hooks/Firestore/useFirestoreCreateQuery';
import useFirestoreUpdateQuery from '../../../hooks/Firestore/useFirestoreUpdateQuery';
import { useForm } from '../../../hooks/Form/useForm';
import { IExpense } from '../../../models/Expense';
import { useFirebaseContext } from '../../../providers/FirebaseProvider';
import { useNotificationDispatch } from '../../../providers/NotificationProvider';
import { NOTIFICATION_THEME_SUCCESS } from '../../../utils/Constants/ThemeConstants';
import { useGetSpendingCategoryNames } from '../hooks/useGetSpendingCategoryNames';
import { useGetStoreNames } from '../hooks/useGetStoreNames';
import { FormFields } from '../interfaces';
import { FormFields as formFields } from '../utils/constants';

type AddExpenseModalProps = {
  uid: string;
  currentTransaction?: IExpense;
  handleModalClose: () => void;
};

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  uid,
  currentTransaction,
  handleModalClose
}) => {
  const { firestoreTimestamp } = useFirebaseContext();
  const notificationDispatch = useNotificationDispatch();
  const storeNames = useGetStoreNames();
  const spendingCategoryNames = useGetSpendingCategoryNames();

  const { values, errors, setFormValues, setFormErrors, resetForm } = useForm<
    FormFields
  >({
    initialValues: {
      category: '',
      amount: '',
      date: '',
      storeName: ''
    }
  });

  const [
    addNewExpenseMutation,
    { isLoading: addingExpense }
  ] = useFirestoreCreateQuery<IExpense>({
    collectionName: 'spending',
    onSuccess: () => {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: 'New expense has been added',
          theme: NOTIFICATION_THEME_SUCCESS
        }
      });
    },
    onComplete: () => {
      resetForm();
      handleModalClose();
    }
  });

  const [
    updateSpendingEntryMutation,
    { isLoading: updatingExpense }
  ] = useFirestoreUpdateQuery<IExpense>({
    collectionName: 'spending',
    onSuccess: () => {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: 'Expense has been edited',
          theme: NOTIFICATION_THEME_SUCCESS
        }
      });
    },
    onComplete: () => {
      resetForm();
      handleModalClose();
    }
  });

  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const formErrors: Array<string> = [];
    const { amount, category, storeName, date } = values;

    // Required fields check
    [{ amount }, { date }, { category }, { storeName }].forEach((item) => {
      const [key, value] = Object.entries(item)[0];
      if (value.trim() === '') formErrors.push(key);
    });

    if (formErrors.length) {
      setFormErrors(formErrors);
      return;
    }

    const timestamp = firestoreTimestamp.now();

    if (!currentTransaction) {
      await addNewExpenseMutation({
        uid,
        storeName: storeName?.trim(),
        category: category?.trim(),
        amount: Number(amount?.trim()),
        date: firestoreTimestamp.fromDate(new Date(date ?? '')),
        createdAt: timestamp,
        updatedAt: timestamp
      } as IExpense);
    } else {
      const changedFields = {} as IExpense;

      if (currentTransaction.amount !== Number(amount)) {
        changedFields.amount = Number(amount);
      }

      if (currentTransaction.category !== category) {
        changedFields.category = category;
      }

      if (
        currentTransaction.date !== firestoreTimestamp.fromDate(new Date(date))
      ) {
        changedFields.date = firestoreTimestamp.fromDate(new Date(date ?? ''));
      }

      if (Object.keys(changedFields).length) {
        changedFields.updatedAt = timestamp;
        await updateSpendingEntryMutation(
          currentTransaction.id ?? '',
          changedFields
        );
      }
    }
  };

  useEffect(() => {
    const formErrors = Object.values(errors).reduce(
      (acc, curr) => acc && curr,
      true
    );
    if (currentTransaction && !formErrors) {
      const { amount, category, date, storeName } = currentTransaction;

      Object.entries({ amount, category, date, storeName }).forEach(
        ([key, value]) => {
          if (key === 'date')
            value = date.toDate().toISOString().substring(0, 10);
          setFormValues(key as FormFields, value as string);
        }
      );
    }
  }, [currentTransaction, errors, setFormValues]);

  const loading = addingExpense || updatingExpense;

  return (
    <Modal
      hideCloseIcon
      title={!currentTransaction ? 'Add Expense' : 'Edit Expense'}
    >
      <form className='w-full' onSubmit={handleSubmit}>
        <div className='mx-3 flex flex-col space-y-6'>
          {formFields.map((field) => {
            switch (field.type) {
              case 'select':
                return (
                  <div key={field.name}>
                    {field.name === 'storeName' && currentTransaction ? (
                      <Input
                        disabled
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        value={values[field.name]}
                        error={errors[field.name]}
                        type={field?.inputType}
                        placeholder={field.placeholder}
                        onChange={(name, value) =>
                          setFormValues(name as FormFields, value)
                        }
                      />
                    ) : (
                      <Select
                        name={field.name}
                        label={field.label}
                        value={values[field.name]}
                        error={errors[field.name]}
                        placeholder={field.placeholder}
                        disabled={loading}
                        options={
                          field.name === 'category'
                            ? spendingCategoryNames
                            : storeNames
                        }
                        onChange={(name, value) =>
                          setFormValues(name as FormFields, value)
                        }
                      />
                    )}
                  </div>
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
                    placeholder={field.placeholder}
                    disabled={loading}
                    onChange={(name, value) =>
                      setFormValues(name as FormFields, value)
                    }
                  />
                );
            }
          })}
        </div>
        <div className='flex items-center justify-end w-full pr-1 mt-8 mb-2 space-x-3'>
          <Button
            layout='secondary'
            disabled={loading}
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button loading={loading} type='submit'>
            Confirm
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddExpenseModal;
