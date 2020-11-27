import React, { useCallback, useEffect } from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import {
  useNewTransactionDispatchContext,
  useNewTransactionStateContext
} from '../../contexts/NewTransactionContext';
import { ADD_AMOUNT, ADD_TRANSACTION_TYPE } from '../../utils/Constants';

function NewTransaction() {
  const state = useNewTransactionStateContext();
  const dispatch = useNewTransactionDispatchContext();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSelectChange = useCallback(
    (value) => dispatch({ type: ADD_TRANSACTION_TYPE, payload: value }),
    [dispatch]
  );

  return (
    <div className='flex justify-center w-full'>
      <form className='my-8 w-1/3' onSubmit={handleSubmit}>
        <Select
          name='transaction-type'
          label='Transaction Type'
          placeHolder='Eg. Credit, Debit'
          selectOptions={['Credit', 'Debit', 'Creditor', 'Spending']}
          onSelectValueChange={handleSelectChange}
        />
        <div className='mt-6'>
          <Input
            name='amount'
            type='tel'
            placeHolder='$0.00'
            label='Amount'
            onBlurUpdate={(inputValue) =>
              dispatch({ type: ADD_AMOUNT, payload: inputValue })
            }
          />
        </div>
      </form>
    </div>
  );
}

export default NewTransaction;
