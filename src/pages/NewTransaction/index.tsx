import React, { useCallback } from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import useGetAllCreditors from '../../hooks/useGetAllCreditors';
import {
  useNewTransactionDispatchContext,
  useNewTransactionStateContext
} from '../../providers/NewTransactionProvider';
import {
  ADD_AMOUNT,
  ADD_NAME,
  NewTransactionActionType
} from '../../reducers/NewTransactionReducer/newTransactionReducer.interface';

function NewTransaction() {
  const { transactionType } = useNewTransactionStateContext();
  const dispatch = useNewTransactionDispatchContext();
  const { data: creditors } = useGetAllCreditors();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSelectChange = useCallback(
    (type: NewTransactionActionType, value: string) =>
      dispatch({
        type,
        payload: { transactionType: value }
      }),
    [dispatch]
  );

  return (
    <div className='flex justify-center w-full'>
      <form className='my-8 w-1/3' onSubmit={handleSubmit}>
        <Select
          name='transaction-type'
          label='Transaction Type'
          placeHolder='Eg. Credit, Debit'
          selectOptions={['Credit', 'Debit']}
          onSelectValueChange={(_, value) =>
            handleSelectChange('ADD_TRANSACTION_TYPE', value)
          }
        />
        {(transactionType === 'Credit' || transactionType === 'Debit') &&
          creditors && (
            <Select
              name='transaction-entity'
              label='Select a Creditor'
              placeHolder='Creditor Name'
              selectOptions={creditors.map(({ name }) => name)}
              onSelectValueChange={(_, value) =>
                handleSelectChange('ADD_TRANSACTION_ENTITY', value)
              }
            />
          )}
        <div className='mt-6'>
          <Input
            name='amount'
            type='tel'
            placeHolder='$0.00'
            label='Amount'
            onBlurUpdate={(inputValue) =>
              dispatch({
                type: ADD_AMOUNT,
                payload: { amount: Number(inputValue) }
              })
            }
          />
        </div>
        <div className='mt-6'>
          <Input
            name='name'
            placeHolder='Name of person or entity'
            label='Name'
            onBlurUpdate={(inputValue) =>
              dispatch({ type: ADD_NAME, payload: { name: inputValue } })
            }
          />
        </div>
      </form>
    </div>
  );
}

export default NewTransaction;
