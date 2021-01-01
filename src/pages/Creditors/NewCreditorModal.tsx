import React, { useCallback, useState } from 'react';
import { ICreditor } from '../../models/Creditor';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';
import {
  INPUT_THEME_ERROR,
  NOTIFICATION_THEME_FAILURE,
  NOTIFICATION_THEME_SUCCESS
} from '../../utils/Constants/ThemeConstants';
import { NumberWithCommasFormatter } from '../../utils/Formatters';
import { isEmptyString } from '../../utils/Functions';
import { AmountValidator, NameValidator } from '../../utils/Validators';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select, { SelectOption } from '../../components/Select';
import Modal from '../../components/Modal/index';

const currencyDropdownOptions: SelectOption[] = [
  { label: 'usd', value: 'USD' },
  { label: 'cad', value: 'CAD' },
  { label: 'inr', value: 'INR' }
];

type NewCreditorModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetchData: () => void;
};

const NewCreditorModal: React.FC<NewCreditorModalProps> = ({
  showModal,
  setShowModal,
  refetchData
}) => {
  const { firebaseApp, firestore } = useFirebaseContext();
  const notificationDispatch = useNotificationDispatchContext();
  const [isCreditorBeingAdded, setIsCreditorBeingAdded] = useState(false);

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
          type: 'ADD_NOTIFICATION',
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
        type: 'ADD_NOTIFICATION',
        payload: {
          content: 'New Creditor Added',
          theme: NOTIFICATION_THEME_SUCCESS
        }
      });
      refetchData();
    } catch (err) {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: 'Error occurred while adding new creditor',
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
      console.error({ err });
    } finally {
      setShowModal(false);
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
    <Modal isOpen={showModal} onCloseClickHandler={() => setShowModal(false)}>
      <div className='flex justify-center mx-8 mb-4 -mt-2'>
        <form className='w-full'>
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
              valueFormatter={NumberWithCommasFormatter}
              validator={AmountValidator}
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
    </Modal>
  );
};

export default NewCreditorModal;
