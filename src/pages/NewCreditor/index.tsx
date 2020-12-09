import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { useFirebaseContext } from '../../contexts/FirebaseContext';
import {
  INPUT_THEME_ERROR,
  NOTIFICATION_THEME_FAILURE,
  NOTIFICATION_THEME_SUCCESS
} from '../../utils/Constants/ThemeConstants';
import { isEmptyString } from '../../utils/Functions';
import { useNotificationDispatchContext } from '../../contexts/NotificationContext';
import { ADD_NOTIFICATION } from '../../utils/Constants/ActionTypes/NotificationReducerActionTypes';
import Button from '../../components/Button';
import { AmountFormatter } from '../../utils/Formatters';
import { NameValidator, NumberValidator } from '../../utils/Validators';
import { ICreditor } from 'models/Creditor';

function NewCreditor() {
  const { firebaseApp, firestore } = useFirebaseContext();
  const notificationDispatch = useNotificationDispatchContext();
  const [isCreditorBeingAdded, setIsCreditorBeingAdded] = useState(false);
  const history = useHistory();

  const [formState, setFormState] = useState({
    name: '',
    amount: '',
    currency: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: { error: false, content: '' },
    amount: { error: false, content: '' },
    currency: { error: false, content: '' }
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

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    let error = false;

    if (isEmptyString(formState.name)) {
      error = error || true;
      handleFormError('name');
    }

    if (isEmptyString(formState.amount)) {
      error = error || true;
      handleFormError('amount');
    }

    if (isEmptyString(formState.currency)) {
      error = error || true;
      handleFormError('currency');
    }

    if (error) return;

    try {
      setIsCreditorBeingAdded(true);
      const querySnapShot = await firestore?.collection('creditors').get();
      const creditors = querySnapShot?.docs
        .map<ICreditor>((doc) => ({ id: doc.id, ...doc.data() } as ICreditor))
        .map((doc) => doc.name.toLowerCase());

      if (creditors?.includes(formState.name.toLowerCase())) {
        notificationDispatch({
          type: ADD_NOTIFICATION,
          payload: {
            content: `Creditor ${formState.name} already exists. To update the amount please create a new transaction`,
            theme: NOTIFICATION_THEME_FAILURE
          }
        });
        setResetForm(true);
        setIsCreditorBeingAdded(false);
        return;
      }

      await firestore?.collection('creditors').add({
        name: formState.name.trim(),
        amount: Number(formState.amount.trim()),
        currency: formState.currency.trim(),
        remainingAmount: Number(formState.amount.trim()),
        createdAt: firebaseApp?.firestore.Timestamp.now(),
        accountSettledOn: null
      });
      notificationDispatch({
        type: ADD_NOTIFICATION,
        payload: {
          content: 'New Creditor Added',
          theme: NOTIFICATION_THEME_SUCCESS
        }
      });
      history.push('/creditors');
    } catch (err) {
      notificationDispatch({
        type: ADD_NOTIFICATION,
        payload: {
          content: 'Error occurred while adding new creditor',
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
      setResetForm(true);
      setIsCreditorBeingAdded(false);
      console.error({ err });
    }
  };

  const handleFormUpdate = useCallback(
    (name: string, value: string) =>
      setFormState((prevState) => ({ ...prevState, [name]: value })),
    [setFormState]
  );

  const resetFormErrors = useCallback(
    (name) =>
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: { error: false, content: '' }
      })),
    []
  );

  return (
    <div className='flex justify-center w-full'>
      <form className='mb-8 w-1/3 mt-16'>
        <Input
          name='name'
          placeHolder='Name of person or entity'
          label='Name'
          onBlurUpdate={handleFormUpdate}
          subContent={formErrors.name.error && formErrors.name.content}
          theme={formErrors.name.error ? INPUT_THEME_ERROR : ''}
          resetField={resetForm}
          validator={NameValidator}
          resetFormErrors={resetFormErrors}
        />
        <div className='mt-6'>
          <Input
            name='amount'
            type='tel'
            placeHolder='$0.00'
            label='Amount'
            onBlurUpdate={handleFormUpdate}
            subContent={formErrors.amount.error && formErrors.amount.content}
            theme={formErrors.amount.error ? INPUT_THEME_ERROR : ''}
            resetField={resetForm}
            valueFormatter={AmountFormatter}
            validator={NumberValidator}
            resetFormErrors={resetFormErrors}
          />
        </div>
        <div className='mt-6'>
          <Select
            name='currency'
            placeHolder='USD, INR, etc'
            label='Currency'
            selectOptions={['USD', 'CAD', 'INR']}
            onSelectValueChange={handleFormUpdate}
            subContent={
              formErrors.currency.error && formErrors.currency.content
            }
            theme={formErrors.currency.error ? INPUT_THEME_ERROR : ''}
            resetField={resetForm}
            resetFormErrors={resetFormErrors}
          />
        </div>
        <div className='mt-10'>
          <Button
            buttonText='Add Creditor'
            onClickHandler={(e) => handleSubmit(e)}
            loading={isCreditorBeingAdded}
          />
        </div>
      </form>
    </div>
  );
}

export default NewCreditor;
