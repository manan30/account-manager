import React, { useCallback, useEffect, useState } from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { useFirebaseContext } from '../../contexts/FirebaseContext';
import { INPUT_THEME_ERROR } from '../../utils/Constants/ThemeConstants';
import { isEmptyString } from '../../utils/Functions';

function NewCreditor() {
  const { firestore } = useFirebaseContext();

  const [formState, setFormState] = useState({
    name: '',
    amount: '',
    currency: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: { error: false, content: '' },
    amount: { error: false, content: '' },
    currency: { error: false, content: '' }
  });

  const handleFormError = (key) => {
    setFormErrors((prevState) => ({
      ...prevState,
      [key]: {
        error: true,
        content: 'Required Field'
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = false;

    if (isEmptyString(formState.name)) {
      error = error || true;
      handleFormError('name');
    }

    if (isEmptyString(formState.name)) {
      error = error || true;
      handleFormError('amount');
    }

    // if (formState.amount.error.content) {
    //   error = error || true;
    //   setFormState((prevState) => ({
    //     ...prevState,
    //     amount: {
    //       value: prevState.amount.value,
    //       error: { content: 'Required Field', status: true }
    //     }
    //   }));
    // }

    if (error) return;
  };

  const handleFormUpdate = useCallback(
    (value, name) =>
      setFormState((prevState) => ({ ...prevState, [name]: value })),
    [setFormState]
  );

  useEffect(() => {
    // firestore
    //   .collection('creditors')
    //   .get()
    //   .then((querySnapshot) => {
    //     const data = querySnapshot.docs.map((doc) => doc.data());
    //     console.log(data); // array of cities objects
    //   })
    //   .catch((err) => console.log(err.message));
  }, [firestore]);

  return (
    <div className='flex justify-center w-full'>
      <form className='mb-8 w-1/3 mt-16'>
        <Input
          name='name'
          placeHolder='Name of person or entity'
          label='Name'
          onBlurUpdate={handleFormUpdate}
          subContent={formErrors.name.error && formErrors.name.content}
          theme={formErrors.name.error && INPUT_THEME_ERROR}
        />
        <div className='mt-6'>
          <Input
            name='amount'
            type='tel'
            placeHolder='$0.00'
            label='Amount'
            onBlurUpdate={handleFormUpdate}
            subContent={formErrors.amount.error && formErrors.amount.content}
            theme={formErrors.amount.error && INPUT_THEME_ERROR}
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
