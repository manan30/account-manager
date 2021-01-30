import Modal from '../../components/Modal';
import React, { useState } from 'react';
import Select from 'components/Select';
import { useFirebaseContext } from '../../providers/FirebaseProvider';

const AddSpendingModal = () => {
  const { firestore } = useFirebaseContext();
  const [formErrors, setFormErrors] = useState({
    storeName: { error: false, content: '' },
    category: { error: false, content: '' },
    amount: { error: false, content: '' },
    date: { error: false, content: '' }
  });
  const [resetForm, setResetForm] = useState(false);

  return (
    <Modal isOpen hideCancelButton>
      <div className='flex justify-center mx-8'>
        <form className='mb-8 w-full'>
          <Select
            name='storeName'
            label='Store Name'
            placeHolder='Eg. Aldi, Target'
            selectOptions={transactionTypeDropdownOptions}
            subContent={formErrors.type.error && formErrors.type.content}
            theme={formErrors.type.error ? INPUT_THEME_ERROR : ''}
            resetField={resetForm}
            setResetField={() => setResetForm(false)}
            resetFormErrors={resetFormErrors}
            onSelectValueChange={handleSelectChange('ADD_TRANSACTION_TYPE')}
          />
        </form>
      </div>
    </Modal>
  );
};

export default AddSpendingModal;
