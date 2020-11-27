import React from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';

function NewTransaction() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='flex justify-center w-full'>
      <form className='my-8 w-1/3' onSubmit={handleSubmit}>
        <Select />
        <div className='mt-6'>
          <Input name='amount' type='tel' placeHolder='$0.00' label='Amount' />
        </div>
      </form>
    </div>
  );
}

export default NewTransaction;
