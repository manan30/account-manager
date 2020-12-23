import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import Select, { SelectOption } from '../../components/Select';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import {
  INPUT_THEME_ERROR,
  NOTIFICATION_THEME_FAILURE,
  NOTIFICATION_THEME_SUCCESS
} from '../../utils/Constants/ThemeConstants';
import { isEmptyString } from '../../utils/Functions';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';
import { ADD_NOTIFICATION } from '../../reducers/NotificationReducer/notificationReducer.interface';
import Button from '../../components/Button';
import { AmountFormatter } from '../../utils/Formatters';
import { NameValidator, NumberValidator } from '../../utils/Validators';
import { ICreditor } from '../../models/Creditor';

const currencyDropdownOptions: SelectOption[] = [
  { label: 'usd', value: 'USD' },
  { label: 'cad', value: 'CAD' },
  { label: 'inr', value: 'INR' }
];

const NewCreditor = () => {
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
    setResetForm(false);

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
      const querySnapShot = await firestore?.collection('creditor').get();
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
        return;
      }

      await firestore?.collection('creditor').add({
        name: formState.name.trim(),
        amount: Number(formState.amount.trim()),
        currency: formState.currency.trim(),
        remainingAmount: Number(formState.amount.trim()),
        accountSettledOn: null,
        accountSettled: false,
        createdAt: firebaseApp?.firestore.Timestamp.now(),
        updatedAt: firebaseApp?.firestore.Timestamp.now()
      });
      notificationDispatch({
        type: ADD_NOTIFICATION,
        payload: {
          content: 'New Creditor Added',
          theme: NOTIFICATION_THEME_SUCCESS
        }
      });
      history.push('/creditor');
    } catch (err) {
      notificationDispatch({
        type: ADD_NOTIFICATION,
        payload: {
          content: 'Error occurred while adding new creditor',
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
      console.error({ err });
    } finally {
      setResetForm(true);
      setIsCreditorBeingAdded(false);
    }
  };

  const handleFormUpdate = useCallback(
    (name: string, value: string) =>
      setFormState((prevState) => ({ ...prevState, [name]: value })),
    []
  );

  const handleSelectChange = useCallback(
    (name: string, option: SelectOption) =>
      setFormState((prevState) => ({ ...prevState, [name]: option.value })),
    []
  );

  const resetFormErrors = useCallback(
    (name: string) =>
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
            selectOptions={currencyDropdownOptions}
            onSelectValueChange={handleSelectChange}
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
            type='submit'
          />
        </div>
      </form>
    </div>
  );
};

export default NewCreditor;
