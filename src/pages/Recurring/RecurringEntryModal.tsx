import React, { useCallback } from 'react';
import cn from 'classnames';
import Button from '../../components/Button';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';
import Select from '../../components/Select/Select';
import useFirestoreCreateQuery from '../../hooks/Firestore/useFirestoreCreateQuery';
import { useFormState } from '../../hooks/Form/useFormState';
import { Recurring, RecurringTransactionType } from './interfaces/Recurring';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { useNotificationDispatch } from '../../providers/NotificationProvider';
import {
  NOTIFICATION_THEME_FAILURE,
  NOTIFICATION_THEME_SUCCESS
} from '../../utils/Constants/ThemeConstants';
import { monthDiffBetweenTwoDates } from '../../utils/Functions';
import { formFields } from './utils/constants';
import { FormState } from './interfaces/types';

type RecurringEntryModalProps = {
  handleClose: () => void;
};

const RecurringEntryModal: React.FC<RecurringEntryModalProps> = ({
  handleClose
}) => {
  const { firestoreTimestamp } = useFirebaseContext();
  const notificationDispatch = useNotificationDispatch();
  const {
    values,
    errors,
    setFormValues,
    setFormErrors,
    resetForm
  } = useFormState<Record<FormState, string>, Record<FormState, boolean>>({
    initialValues: {
      name: '',
      amount: '',
      date: '',
      type: '',
      endingDate: '',
      category: '',
      frequency: '',
      customFrequency: ''
    },
    initialErrors: {
      name: false,
      amount: false,
      date: false,
      type: false,
      endingDate: false,
      category: false,
      frequency: false,
      customFrequency: false
    }
  });
  const [
    addNewRecurringTransactionMutation,
    { isLoading }
  ] = useFirestoreCreateQuery<Recurring>({
    collectionName: 'recurring'
  });

  const handleFormSubmit = useCallback(
    async (
      e:
        | React.FormEvent<HTMLFormElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      const formErrors: Array<string> = [];
      Object.entries(values).forEach(([key, value]) => {
        if (!value || value.trim() === '') formErrors.push(key);
      });
      if (formErrors.length) {
        setFormErrors(formErrors);
        return;
      }
      try {
        const { amount, date, endingDate, name, type } = values;
        const timestamp = firestoreTimestamp.now();

        // TODO: Set error for incorrect amount
        // if (Number.isNaN(parseInt(amount))) {
        // }

        // TODO: Set error for incorrect date
        // if (!isValidDate(date) || !isValidDate(endingDate)) {
        // }

        const newTransaction = {
          name,
          amount: Number(amount),
          createdAt: timestamp,
          updatedAt: timestamp,
          type: type as RecurringTransactionType,
          recurringDate: firestoreTimestamp.fromDate(new Date(date))
        } as Recurring;

        if (endingDate) {
          newTransaction.metadata = {
            monthlyPaymentsRemaining: monthDiffBetweenTwoDates(
              new Date().toISOString(),
              endingDate
            )
          };
        }

        await addNewRecurringTransactionMutation(newTransaction);

        notificationDispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            content: 'New Recurring Transaction Added',
            theme: NOTIFICATION_THEME_SUCCESS
          }
        });
      } catch (err) {
        notificationDispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            content: 'Error occurred while adding new recurring transaction',
            theme: NOTIFICATION_THEME_FAILURE
          }
        });
        console.error({ err });
      } finally {
        resetForm();
      }
    },
    [
      values,
      firestoreTimestamp,
      setFormErrors,
      addNewRecurringTransactionMutation,
      notificationDispatch,
      resetForm
    ]
  );

  return (
    <Modal title='Add Recurring Transaction' onCloseIconClick={handleClose}>
      <form
        className='grid gap-4 p-1 xl:grid-cols-2'
        onSubmit={handleFormSubmit}
      >
        {formFields.map((field) => {
          switch (field.type) {
            case 'select':
              return (
                <div
                  key={field.name}
                  className={cn(
                    field.name === 'frequency' &&
                      values.frequency !== 'custom' &&
                      ''
                  )}
                >
                  <Select
                    name={field.name}
                    label={field.label}
                    value={values[field.name]}
                    error={errors[field.name]}
                    placeholder={field.placeholder}
                    disabled={isLoading}
                    options={(field.options as unknown) as string[]}
                    onChange={(name, value) =>
                      setFormValues(name as FormState, value)
                    }
                  />
                </div>
              );
            default:
              return field.name !== 'customFrequency' ||
                values.frequency === 'custom' ? (
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
                    setFormValues(name as FormState, value)
                  }
                />
              ) : null;
          }
        })}
      </form>
      <div className='flex items-center justify-end w-full pr-1 mt-8 mb-2 space-x-3'>
        <Button layout='secondary' loading={isLoading} onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} loading={isLoading}>
          Add
        </Button>
      </div>
    </Modal>
  );
};

export default RecurringEntryModal;
