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
      <form className='mb-8 w-1/3 mt-16'>
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
            <div className='mt-6'>
              <Select
                name='transaction-entity'
                label='Select a Creditor'
                placeHolder='Creditor Name'
                selectOptions={creditors.map(({ name }) => name)}
                onSelectValueChange={(_, value) =>
                  handleSelectChange('ADD_TRANSACTION_ENTITY', value)
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
            onBlurUpdate={(inputValue) =>
              dispatch({
                type: 'ADD_AMOUNT',
                payload: { amount: Number(inputValue) }
              })
            }
          />
        </div>
        <div className='mt-6'>
          <Input
            name='transaction-date'
            placeHolder='MM/DD/YYYY'
            label='Transaction Date'
            onBlurUpdate={(inputValue) =>
              dispatch({
                type: 'ADD_TRANSACTION_ENTITY',
                payload: { name: inputValue }
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
