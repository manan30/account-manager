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
import { NewTransactionActionType } from '../../reducers/NewTransactionReducer/newTransactionReducer.interface';
import {
  INPUT_THEME_ERROR,
  NOTIFICATION_THEME_FAILURE,
  NOTIFICATION_THEME_SUCCESS
} from '../../utils/Constants/ThemeConstants';
import { NumberWithCommasFormatter } from '../../utils/Formatters';
import { isEmptyString } from '../../utils/Functions';
import { AmountValidator } from '../../utils/Validators';
import CreditorsSelect from './CreditorsSelect';

const transactionTypeDropdownOptions: SelectOption[] = [
  { label: 'credit', value: 'Credit' },
  { label: 'debit', value: 'Debit' }
];

const NewTransaction = () => {
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
    setResetForm(false);

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

  const handleInputChange = useCallback(
    (type: NewTransactionActionType) => (name: string, value: string) =>
      newTransactionDispatch({
        type,
        payload: { [name]: value }
      }),
    [newTransactionDispatch]
  );

  const handleSelectChange = useCallback(
    (type: NewTransactionActionType, use?: string) => (
      name: string,
      option: SelectOption
    ) =>
      newTransactionDispatch({
        type,
        payload: { [name]: use === 'label' ? option.label : option.value }
      }),
    [newTransactionDispatch]
  );

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
          onSelectValueChange={handleSelectChange('ADD_TRANSACTION_TYPE')}
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
            placeHolder='0.00'
            label='Amount'
            subContent={formErrors.amount.error && formErrors.amount.content}
            theme={formErrors.amount.error ? INPUT_THEME_ERROR : ''}
            resetField={resetForm}
            resetFormErrors={resetFormErrors}
            validator={AmountValidator}
            valueFormatter={NumberWithCommasFormatter}
            onBlurUpdate={handleInputChange('ADD_TRANSACTION_AMOUNT')}
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
            onBlurUpdate={handleInputChange('ADD_TRANSACTION_DATE')}
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
};

export default NewTransaction;
