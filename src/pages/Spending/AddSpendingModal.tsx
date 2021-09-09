import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Select, { SelectOption } from '../../components/Select';
import useFirestoreCreateQuery from '../../hooks/Firestore/useFirestoreCreateQuery';
import useFirestoreReadQuery from '../../hooks/Firestore/useFirestoreReadQuery';
import useFirestoreUpdateQuery from '../../hooks/Firestore/useFirestoreUpdateQuery';
import { ISpending } from '../../models/Spending';
import { ISpendingCategory } from '../../models/SpendingCategory';
import { IStore } from '../../models/Store';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { useNotificationDispatch } from '../../providers/NotificationProvider';
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

interface FormFields extends Record<string, string | undefined> {
  storeName?: string;
  category?: string;
  amount?: string;
  date?: string;
}

const AddSpendingModal: React.FC<AddSpendingModalProps> = ({
  handleModalClose,
  currentTransaction
}) => {
  const { firestoreTimestamp } = useFirebaseContext();
  const notificationDispatch = useNotificationDispatch();
  const {
    data: storeNamesData,
    isLoading: fetchingStores
  } = useFirestoreReadQuery<IStore>({ collection: 'stores' });
  const {
    data: spendingCategoryNamesData,
    isLoading: fetchingSpendingCategoryNames
  } = useFirestoreReadQuery<ISpendingCategory>({
    collection: 'spending-categories'
  });
  const [addNewSpendingEntryMutation, { isLoading }] = useFirestoreCreateQuery<
    ISpending
  >({ collectionName: 'spending' });
  const [updateSpendingEntryMutation] = useFirestoreUpdateQuery<ISpending>({
    collectionName: 'spending'
  });
  const [formState, setFormState] = useState<FormFields>({
    storeName: '',
    category: '',
    amount: '',
    date: ''
  });
  const [formErrors, setFormErrors] = useState({
    storeName: { error: false, content: '' },
    category: { error: false, content: '' },
    amount: { error: false, content: '' },
    date: { error: false, content: '' }
  });
  const [resetForm, setResetForm] = useState(false);
  const [changedFields, setChangedFields] = useState<FormFields | undefined>();

  const resetFormErrors = useCallback(
    (name: string) =>
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: { error: false, content: '' }
      })),
    []
  );

  const storeNameDropdownOptions = useMemo(() => {
    if (storeNamesData && storeNamesData.length > 0) {
      return storeNamesData.map(({ name }) => ({
        label: name.toLowerCase(),
        value: name
      })) as SelectOption[];
    }
    return [] as SelectOption[];
  }, [storeNamesData]);

  const spendingCategoryNameDropdownOptions = useMemo(() => {
    if (spendingCategoryNamesData && spendingCategoryNamesData.length > 0) {
      return spendingCategoryNamesData.map(({ name }) => ({
        label: name.toLowerCase(),
        value: name
      })) as SelectOption[];
    }
    return [] as SelectOption[];
  }, [spendingCategoryNamesData]);

  const currentTransactionMap = useMemo(() => {
    if (!currentTransaction) return undefined;
    const map = new Map<string, string>(Object.entries(currentTransaction));
    map.set(
      'date',
      new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        year: 'numeric',
        day: 'numeric'
      }).format(currentTransaction.date.toDate())
    );
    map.set('amount', `${currentTransaction.amount}`);
    return map;
  }, [currentTransaction]);

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

    const { amount, category, storeName, date } = formState;

    if (isEmptyString(storeName)) {
      error = error || true;
      handleFormError('storeName');
    }

    if (isEmptyString(category)) {
      error = error || true;
      handleFormError('category');
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
      const timestamp = firestoreTimestamp.now();

      if (!currentTransaction) {
        await addNewSpendingEntryMutation({
          storeName: storeName?.trim(),
          category: category?.trim(),
          amount: Number(amount?.trim()),
          date: firestoreTimestamp.fromDate(new Date(date ?? '')),
          createdAt: timestamp,
          updatedAt: timestamp
        } as ISpending);
      } else {
        if (changedFields) {
          const updatedFields = {} as Partial<ISpending>;
          Object.entries(changedFields).forEach(([key, value]) => {
            if (value && value?.trim() !== '') {
              if (key === 'date') {
                updatedFields.date = firestoreTimestamp.fromDate(
                  new Date(value)
                );
              } else if (key === 'amount') {
                updatedFields.amount = Number(value);
              } else {
                updatedFields.category = value;
              }
            }
          });
          await updateSpendingEntryMutation(currentTransaction.id ?? '', {
            ...updatedFields,
            updatedAt: timestamp
          } as Partial<ISpending>);
        }
      }

      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: !currentTransaction
            ? 'New spending entry added'
            : 'Spending entry updated',
          theme: NOTIFICATION_THEME_SUCCESS
        }
      });
    } catch (err) {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: `Error occurred while ${
            !currentTransaction ? 'adding new' : 'updating'
          } spending entry`,
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
      console.error({ err });
    } finally {
      setResetForm(true);
      handleModalClose();
    }
  };

  useEffect(() => {
    if (currentTransactionMap) {
      Object.entries(formState).forEach(([key, value]) => {
        if (
          !currentTransactionMap.has(key) ||
          currentTransactionMap.get(key) !== value
        ) {
          setChangedFields((prevState) => ({ ...prevState, [key]: value }));
        }
      });
    }
  }, [formState, currentTransactionMap]);

  return (
    <Modal
      isOpen
      onCloseClickHandler={() => {
        !isLoading && handleModalClose();
      }}
    >
      <div className='flex justify-center mx-8'>
        <form className='w-full mb-8'>
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
              name='category'
              label='Category Name'
              placeHolder='Eg. Rent, Groceries'
              selectOptions={spendingCategoryNameDropdownOptions}
              subContent={
                formErrors.category.error && formErrors.category.content
              }
              theme={formErrors.category.error ? INPUT_THEME_ERROR : ''}
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
              loading={isLoading}
              disabled={
                currentTransaction &&
                changedFields &&
                Object.values(changedFields).filter((v) => v && v.trim() !== '')
                  .length === 0
              }
              type='submit'
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddSpendingModal;
