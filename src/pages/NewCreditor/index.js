import React, { useCallback, useState } from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';

function NewCreditor() {
  const [formState, setFormState] = useState({
    name: '',
    amount: '',
    currency: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFormUpdate = useCallback(
    (value, name) =>
      setFormState((prevState) => ({ ...prevState, [name]: value })),
    [setFormState]
  );

  return (
    <div className='flex justify-center w-full'>
      <form className='mb-8 w-1/3 mt-16'>
        <Input
          name='name'
          placeHolder='Name of person or entity'
          label='Name'
          onBlurUpdate={handleFormUpdate}
        />
        <div className='mt-6'>
          <Input
            name='amount'
            type='tel'
            placeHolder='$0.00'
            label='Amount'
            onBlurUpdate={handleFormUpdate}
          />
        </div>
        <div className='mt-6'>
          <Select
            name='currency'
            type='tel'
            placeHolder='USD, INR, etc'
            label='Currency'
            selectOptions={['USD', 'CAD', 'INR']}
            onSelectValueChange={handleFormUpdate}
          />
        </div>
        <div className='mt-10'>
          <button
            type='submit'
            className='w-full bg-indigo-600 rounded-lg p-2 text-gray-200 hover:shadow-lg'
            onClick={handleSubmit}
          >
            Add New Creditor
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewCreditor;
