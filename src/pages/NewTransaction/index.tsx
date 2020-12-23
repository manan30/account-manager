import React, { useCallback, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import useGetAllCreditors from '../../hooks/useGetAllCreditors';
import {
  useNewTransactionDispatchContext,
  useNewTransactionStateContext
} from '../../providers/NewTransactionProvider';
import { NewTransactionActionType } from '../../reducers/NewTransactionReducer/newTransactionReducer.interface';
import { SelectOption } from '../../components/Select';

const transactionTypeDropdownOptions: SelectOption[] = [
  { label: 'credit', value: 'Credit' },
  { label: 'debit', value: 'Debit' }
];

function NewTransaction() {
  const { transactionType } = useNewTransactionStateContext();
  const { data: creditors } = useGetAllCreditors();
  const [isTransactionBeingAdded, setIsTransactionBeingAdded] = useState(false);
  const dispatch = useNewTransactionDispatchContext();

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
          onSelectValueChange={(_, option) =>
            dispatch({
              type: 'ADD_TRANSACTION_TYPE',
              payload: { transactionType: option.value }
            })
          }
        />
        {(transactionType === 'Credit' || transactionType === 'Debit') &&
          creditors && (
            <div className='mt-6'>
              <Select
                name='transaction-entity'
                label='Select a Creditor'
                placeHolder='Creditor Name'
                selectOptions={
                  creditors.map(({ id, name }) => ({
                    label: id,
                    value: name
                  })) as SelectOption[]
                }
                onSelectValueChange={(_, option) =>
                  dispatch({
                    type: 'ADD_TRANSACTION_ENTITY',
                    payload: { entity: option.label }
                  })
                }
              />
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
            buttonText='Add Creditor'
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
