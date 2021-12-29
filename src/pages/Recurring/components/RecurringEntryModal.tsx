import React, { useCallback } from 'react';
import cn from 'classnames';
import Button from '../../../components/Button';
import Input from '../../../components/Input/Input';
import Modal from '../../../components/Modal/Modal';
import Select from '../../../components/Select/Select';
import useFirestoreCreateQuery from '../../../hooks/Firestore/useFirestoreCreateQuery';
import { useForm } from '../../../hooks/Form/useForm';
import { useFirebaseContext } from '../../../providers/FirebaseProvider';
import { useNotificationDispatch } from '../../../providers/NotificationProvider';
import { NOTIFICATION_THEME_SUCCESS } from '../../../utils/Constants/ThemeConstants';
import { monthDiffBetweenTwoDates } from '../../../utils/Functions';
import { FormFields as formFields } from '../utils/constants';
import { FormFields } from '../interfaces/types';
import { Recurring } from '../interfaces/recurring.model';

type RecurringEntryModalProps = {
  uid: string;
  handleClose: () => void;
};

const RecurringEntryModal: React.FC<RecurringEntryModalProps> = ({
  uid,
  handleClose
}) => {
  const { firestoreTimestamp } = useFirebaseContext();
  const notificationDispatch = useNotificationDispatch();
  const { values, errors, setFormValues, setFormErrors, resetForm } = useForm<
    FormFields
  >({
    initialValues: {
      name: '',
      amount: '',
      date: '',
      type: '',
      endingDate: '',
      category: '',
      frequency: '',
      customFrequency: ''
    }
  });
  const [
    addNewRecurringTransactionMutation,
    { isLoading }
  ] = useFirestoreCreateQuery<Recurring>({
    collectionName: 'recurring',
    onSuccess: () => {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: 'New Recurring Transaction Added',
          theme: NOTIFICATION_THEME_SUCCESS
        }
      });
    },
    onComplete: () => {
      resetForm();
    }
  });

  const handleFormSubmit = useCallback(
    async (
      e:
        | React.FormEvent<HTMLFormElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      const formErrors: Array<string> = [];
      const {
        amount,
        date,
        endingDate,
        name,
        type,
        category,
        customFrequency,
        frequency
      } = values;

      // Required fields check
      [
        { amount },
        { date },
        { name },
        { type },
        { category },
        { frequency }
      ].forEach((item) => {
        const [key, value] = Object.entries(item)[0];
        if (value.trim() === '') formErrors.push(key);
      });

      // TODO: Set error for incorrect amount
      // if (Number.isNaN(parseInt(amount))) {
      // }

      // TODO: Set error for incorrect date
      // if (!isValidDate(date) || !isValidDate(endingDate)) {
      // }

      if (frequency === 'Custom' && customFrequency.trim() === '') {
        formErrors.push('customFrequency');
      }

      if (formErrors.length) {
        setFormErrors(formErrors);
        return;
      }

      const timestamp = firestoreTimestamp.now();

      const newTransaction = {
        name,
        amount: Number(amount),
        createdAt: timestamp,
        updatedAt: timestamp,
        type,
        category,
        recurringDate: firestoreTimestamp.fromDate(new Date(date)),
        completed: false,
        uid
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
    },
    [
      values,
      firestoreTimestamp,
      uid,
      setFormErrors,
      addNewRecurringTransactionMutation
    ]
  );

  return (
    <Modal title='Add Recurring Transaction' hideCloseIcon>
      <form onSubmit={handleFormSubmit}>
        <div className='grid gap-4 p-1 xl:grid-cols-2'>
          {formFields.map((field) => {
            switch (field.type) {
              case 'select':
                return (
                  <div
                    key={field.name}
                    className={cn(
                      field.name === 'frequency' &&
                        values.frequency !== 'Custom' &&
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
                        setFormValues(name as FormFields, value)
                      }
                    />
                  </div>
                );
              default:
                return field.name !== 'customFrequency' ||
                  values.frequency === 'Custom' ? (
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
                      setFormValues(name as FormFields, value)
                    }
                  />
                ) : (
                  <div key='hidden' />
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

export default RecurringEntryModal;
