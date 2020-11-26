import React from 'react';
import Input from '../../components/Input';

function NewTransaction() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='flex justify-center w-full'>
      <form className='my-8 w-1/2' onSubmit={handleSubmit}>
        <Input name='amount' type='tel' />
      </form>
    </div>
  );
}

export default NewTransaction;
