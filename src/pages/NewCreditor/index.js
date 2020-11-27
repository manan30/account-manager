import React from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';

function NewCreditor() {
  const [formState, setFormState] = useState({});

  return (
    <div className='flex justify-center w-full'>
      <form className='my-8 w-1/3'>
        <div className='mt-6'>
          <Input
            name='name'
            placeHolder='Name of person or entity'
            label='Name'
          />
        </div>
        <div className='mt-6'>
          <Input name='amount' type='tel' placeHolder='$0.00' label='Amount' />
        </div>
        <div className='mt-6'>
          <Select
            name='currency'
            type='tel'
            placeHolder='USD, INR, etc'
            label='Currency'
            selectOptions={['USD', 'CAD', 'INR']}
          />
        </div>
      </form>
    </div>
  );
}

export default NewCreditor;
