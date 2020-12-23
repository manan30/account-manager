import React, { useCallback, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select, { SelectOption } from '../../components/Select';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import {
  useNewTransactionDispatchContext,
  useNewTransactionStateContext
} from '../../providers/NewTransactionProvider';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';
import {
  INPUT_THEME_ERROR,
  NOTIFICATION_THEME_FAILURE,
  NOTIFICATION_THEME_SUCCESS
} from '../../utils/Constants/ThemeConstants';
import { isEmptyString } from '../../utils/Functions';
import CreditorsSelect from './CreditorsSelect';

const transactionTypeDropdownOptions: SelectOption[] = [
  { label: 'credit', value: 'Credit' },
  { label: 'debit', value: 'Debit' }
];

function NewTransaction() {
  const { type, entity, amount, date } = useNewTransactionStateContext();
  const [isTransactionBeingAdded, setIsTransactionBeingAdded] = useState(false);
  const { firestore, firebaseApp } = useFirebaseContext();
  const newTransactionDispatch = useNewTransactionDispatchContext();
  const notificationDispatch = useNotificationDispatchContext();

  const [formErrors, setFormErrors] = useState({
    type: { error: false, content: '' },
    entity: { error: false, content: '' },
    amount: { error: false, content: '' },
    date: { error: false, content: '' }
  });
  const [resetForm, setResetForm] = useState(false);

  const handleFormError = (key: string) => {
    setFormErrors((prevState) => ({
      ...prevState,
      [key]: {
        error: true,
        content: 'Required Field'
      }
    }));
  };

  const resetFormErrors = useCallback(
    (name: string) =>
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: { error: false, content: '' }
      })),
    []
  );

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    let error = false;

    if (isEmptyString(type)) {
      error = error || true;
      handleFormError('type');
    }

    if ((type === 'Credit' || type === 'Debit') && isEmptyString(entity)) {
      error = error || true;
      handleFormError('entity');
    }

    if (isEmptyString(amount)) {
      error = error || true;
      handleFormError('amount');
    }

    if (isEmptyString(date)) {
      error = error || true;
      handleFormError('date');
    }

    if (error) return;

    try {
      setIsTransactionBeingAdded(true);

      await firestore?.collection('transaction').add({
        transactionType: type.trim(),
        transactionEntity: entity.trim(),
        amount: Number(amount.trim()),
        transactionDate: firebaseApp?.firestore.Timestamp.fromDate(
          new Date(date)
        ),
        createdAt: firebaseApp?.firestore.Timestamp.now()
      });
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: 'New Transaction Added',
          theme: NOTIFICATION_THEME_SUCCESS
        }
      });
    } catch (err) {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: 'Error occurred while adding new transaction',
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
      console.error({ err });
    } finally {
      setResetForm(true);
      setIsTransactionBeingAdded(false);
    }
  };

  return (
    <div className='flex justify-center w-full'>
      <form className='mb-8 w-1/3 mt-16'>
        <Select
          name='type'
          label='Transaction Type'
          placeHolder='Eg. Credit, Debit'
          selectOptions={transactionTypeDropdownOptions}
          subContent={formErrors.type.error && formErrors.type.content}
          theme={formErrors.type.error ? INPUT_THEME_ERROR : ''}
          resetField={resetForm}
          resetFormErrors={resetFormErrors}
          onSelectValueChange={(_, option) =>
            newTransactionDispatch({
              type: 'ADD_TRANSACTION_TYPE',
              payload: { type: option.value }
            })
          }
        />
        {(type === 'Credit' || type === 'Debit') && (
          <div className='mt-6'>
            <CreditorsSelect
              formError={formErrors.entity}
              resetForm={resetForm}
              resetFormError={resetFormErrors}
            />
          </div>
        )}
        <div className='mt-6'>
          <Input
            name='amount'
            type='tel'
            placeHolder='$0.00'
            label='Amount'
            subContent={formErrors.amount.error && formErrors.amount.content}
            theme={formErrors.amount.error ? INPUT_THEME_ERROR : ''}
            resetField={resetForm}
            resetFormErrors={resetFormErrors}
            onBlurUpdate={(_, value) =>
              newTransactionDispatch({
                type: 'ADD_TRANSACTION_AMOUNT',
                payload: { amount: value }
              })
            }
          />
        </div>
        <div className='mt-6'>
          {/* TODO: Validate date input and create date picker UI */}
          <Input
            name='date'
            placeHolder='MM/DD/YYYY'
            label='Transaction Date'
            subContent={formErrors.date.error && formErrors.date.content}
            theme={formErrors.date.error ? INPUT_THEME_ERROR : ''}
            resetField={resetForm}
            resetFormErrors={resetFormErrors}
            onBlurUpdate={(_, value) =>
              newTransactionDispatch({
                type: 'ADD_TRANSACTION_DATE',
                payload: { date: value }
              })
            }
          />
        </div>
        <div className='mt-10'>
          <Button
            buttonText='Add Transaction'
            onClickHandler={(e) => handleSubmit(e)}
            loading={isTransactionBeingAdded}
            type='submit'
          />
        </div>
      </form>
    </div>
  );
}

export default NewTransaction;
