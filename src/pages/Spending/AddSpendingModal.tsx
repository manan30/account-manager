import React, { useCallback, useMemo, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Select, { SelectOption } from '../../components/Select';
import useGetSpendingCategoryNames from '../../hooks/SpendingCategory/useGetSpendingCategoryNames';
import useGetStoreNames from '../../hooks/Stores/useGetStoreNames';
import { SPENDING } from '../../models/models';
import { ISpending } from '../../models/Spending';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';
import {
  INPUT_THEME_ERROR,
  NOTIFICATION_THEME_FAILURE,
  NOTIFICATION_THEME_SUCCESS
} from '../../utils/Constants/ThemeConstants';
import { NumberWithCommasFormatter } from '../../utils/Formatters';
import { isEmptyString } from '../../utils/Functions';
import { AmountValidator } from '../../utils/Validators';

type AddSpendingModalProps = {
  handleModalClose: () => void;
  currentTransaction?: ISpending;
};

const AddSpendingModal: React.FC<AddSpendingModalProps> = ({
  handleModalClose,
  currentTransaction
}) => {
  const { firestore, firebaseApp } = useFirebaseContext();
  const notificationDispatch = useNotificationDispatchContext();
  const { data: storeNames, isLoading: fetchingStores } = useGetStoreNames();
  const {
    data: spendingCategoryNames,
    isLoading: fetchingSpendingCategoryNames
  } = useGetSpendingCategoryNames();
  const [formState, setFormState] = useState({
    storeName: '',
    categoryName: '',
    amount: '',
    date: ''
  });
  const [formErrors, setFormErrors] = useState({
    storeName: { error: false, content: '' },
    categoryName: { error: false, content: '' },
    amount: { error: false, content: '' },
    date: { error: false, content: '' }
  });
  const [resetForm, setResetForm] = useState(false);
  const [isSpendingEntryBeingAdded, setIsSpendingEntryBeingAdded] = useState(
    false
  );

  const resetFormErrors = useCallback(
    (name: string) =>
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: { error: false, content: '' }
      })),
    []
  );

  const storeNameDropdownOptions = useMemo(() => {
    if (storeNames && storeNames.length > 0) {
      return storeNames.map(({ name }) => ({
        label: name.toLowerCase(),
        value: name
      })) as SelectOption[];
    }
    return [] as SelectOption[];
  }, [storeNames]);

  const spendingCategoryNameDropdownOptions = useMemo(() => {
    if (spendingCategoryNames && spendingCategoryNames.length > 0) {
      return spendingCategoryNames.map(({ name }) => ({
        label: name.toLowerCase(),
        value: name
      })) as SelectOption[];
    }
    return [] as SelectOption[];
  }, [spendingCategoryNames]);

  const handleChange = useCallback((name: string, value: string) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleSelectChange = useCallback(
    (name: string, { value }: { value: string }) => {
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    },
    []
  );

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

    const { amount, categoryName, storeName, date } = formState;

    if (isEmptyString(storeName)) {
      error = error || true;
      handleFormError('storeName');
    }

    if (isEmptyString(categoryName)) {
      error = error || true;
      handleFormError('categoryName');
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
      setIsSpendingEntryBeingAdded(true);

      const timestamp = firebaseApp?.firestore.Timestamp.now();

      if (!currentTransaction) {
        await firestore?.collection(SPENDING).add({
          storeName: storeName.trim(),
          category: categoryName.trim(),
          amount: Number(amount.trim()),
          date: firebaseApp?.firestore.Timestamp.fromDate(new Date(date)),
          createdAt: timestamp,
          updatedAt: timestamp
        } as ISpending);
      } else {
        await firestore
          .collection(SPENDING)
          .doc(currentTransaction.id)
          .update({
            category: categoryName.trim(),
            amount: Number(amount.trim()),
            date: firebaseApp?.firestore.Timestamp.fromDate(new Date(date)),
            updatedAt: timestamp
          } as Partial<ISpending>);
      }

      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: 'New Spending Entry Added',
          theme: NOTIFICATION_THEME_SUCCESS
        }
      });
    } catch (err) {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: 'Error occurred while adding a new spending entry',
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
      console.error({ err });
    } finally {
      setResetForm(true);
      setIsSpendingEntryBeingAdded(false);
    }
  };

  return (
    <Modal
      isOpen
      onCloseClickHandler={() => {
        !isSpendingEntryBeingAdded && handleModalClose();
      }}
    >
      <div className='flex justify-center mx-8'>
        <form className='mb-8 w-full'>
          {!currentTransaction ? (
            <Select
              name='storeName'
              label='Store Name'
              placeHolder='Eg. Aldi, Target'
              selectOptions={storeNameDropdownOptions}
              subContent={
                formErrors.storeName.error && formErrors.storeName.content
              }
              theme={formErrors.storeName.error ? INPUT_THEME_ERROR : ''}
              resetField={resetForm}
              setResetField={() => setResetForm(false)}
              resetFormErrors={resetFormErrors}
              onSelectValueChange={handleSelectChange}
              isLoading={fetchingStores}
            />
          ) : (
            <Input
              name='storeName'
              label='Store Name'
              onBlurUpdate={handleChange}
              defaultValue={currentTransaction.storeName}
              disabled
            />
          )}
          <div className='mt-6'>
            <Select
              name='categoryName'
              label='Category Name'
              placeHolder='Eg. Rent, Groceries'
              selectOptions={spendingCategoryNameDropdownOptions}
              subContent={
                formErrors.categoryName.error && formErrors.categoryName.content
              }
              theme={formErrors.categoryName.error ? INPUT_THEME_ERROR : ''}
              resetField={resetForm}
              setResetField={() => setResetForm(false)}
              resetFormErrors={resetFormErrors}
              onSelectValueChange={handleSelectChange}
              isLoading={fetchingSpendingCategoryNames}
              defaultValue={currentTransaction && currentTransaction.category}
            />
          </div>
          <div className='mt-6'>
            <Input
              name='amount'
              type='tel'
              placeHolder='0.00'
              label='Amount'
              subContent={formErrors.amount.error && formErrors.amount.content}
              theme={formErrors.amount.error ? INPUT_THEME_ERROR : ''}
              resetField={resetForm}
              setResetField={() => setResetForm(false)}
              resetFormErrors={resetFormErrors}
              validator={AmountValidator}
              valueFormatter={NumberWithCommasFormatter}
              onBlurUpdate={handleChange}
              defaultValue={
                currentTransaction && `${currentTransaction.amount}`
              }
            />
          </div>
          <div className='my-6'>
            <Input
              name='date'
              placeHolder='MM/DD/YYYY'
              label='Spending Date'
              subContent={formErrors.date.error && formErrors.date.content}
              theme={formErrors.date.error ? INPUT_THEME_ERROR : ''}
              resetField={resetForm}
              setResetField={() => setResetForm(false)}
              resetFormErrors={resetFormErrors}
              onBlurUpdate={handleChange}
              defaultValue={
                currentTransaction &&
                new Intl.DateTimeFormat('en-US', {
                  month: '2-digit',
                  year: 'numeric',
                  day: 'numeric'
                }).format(currentTransaction.date.toDate())
              }
            />
          </div>
          <div className='mt-10'>
            <Button
              buttonText={
                !currentTransaction
                  ? 'Add Spending Entry'
                  : 'Update Spending Entry'
              }
              onClickHandler={(e) => handleSubmit(e)}
              loading={isSpendingEntryBeingAdded}
              type='submit'
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddSpendingModal;
