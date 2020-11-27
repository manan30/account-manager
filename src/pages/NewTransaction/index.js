import React from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import NewTransactionContextProvider, {
  useNewTransactionContext
} from '../../contexts/NewTransactionContext';

function NewTransaction() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <NewTransactionContextProvider>
      <div className='flex justify-center w-full'>
        <form className='my-8 w-1/3' onSubmit={handleSubmit}>
          <Select
            name='transaction-type'
            label='Transaction Type'
            placeHolder='Eg. Credit, Debit'
            selectOptions={['Credit', 'Debit', 'Creditor', 'Spending']}
          />
          <div className='mt-6'>
            <Input
              name='amount'
              type='tel'
              placeHolder='$0.00'
              label='Amount'
            />
          </div>
        </form>
      </div>
    </NewTransactionContextProvider>
  );
}

export default NewTransaction;
