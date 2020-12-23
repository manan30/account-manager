import React, { useCallback, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import {
  useNewTransactionDispatchContext,
  useNewTransactionStateContext
} from '../../providers/NewTransactionProvider';
import { SelectOption } from '../../components/Select';
import CreditorsSelect from './CreditorsSelect';
import { INPUT_THEME_ERROR } from '../../utils/Constants/ThemeConstants';

const transactionTypeDropdownOptions: SelectOption[] = [
  { label: 'credit', value: 'Credit' },
  { label: 'debit', value: 'Debit' }
];

function NewTransaction() {
  const { transactionType } = useNewTransactionStateContext();
  const [isTransactionBeingAdded, setIsTransactionBeingAdded] = useState(false);
  const dispatch = useNewTransactionDispatchContext();

  const [formErrors, setFormErrors] = useState({
    amount: { error: false, content: '' },
    type: { error: false, content: '' },
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
  };

  return (
    <div className='flex justify-center w-full'>
      <form className='mb-8 w-1/3 mt-16'>
        <Select
          name='transaction-type'
          label='Transaction Type'
          placeHolder='Eg. Credit, Debit'
          selectOptions={transactionTypeDropdownOptions}
          subContent={formErrors.type.error && formErrors.type.content}
          theme={formErrors.type.error ? INPUT_THEME_ERROR : ''}
          resetField={resetForm}
          resetFormErrors={resetFormErrors}
          onSelectValueChange={(_, option) =>
            dispatch({
              type: 'ADD_TRANSACTION_TYPE',
              payload: { transactionType: option.value }
            })
          }
        />
        {(transactionType === 'Credit' || transactionType === 'Debit') && (
          <div className='mt-6'>
            <CreditorsSelect />
          </div>
        )}
        <div className='mt-6'>
          <Input
            name='amount'
            type='tel'
            placeHolder='$0.00'
            label='Amount'
            onBlurUpdate={(_, value) =>
              dispatch({
                type: 'ADD_AMOUNT',
                payload: { amount: Number(value) }
              })
            }
          />
        </div>
        <div className='mt-6'>
          {/* TODO: Validate date input and create date picker UI */}
          <Input
            name='transaction-date'
            placeHolder='MM/DD/YYYY'
            label='Transaction Date'
            onBlurUpdate={(_, value) =>
              dispatch({
                type: 'ADD_TRANSACTION_DATE',
                payload: { transactionDate: value }
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
