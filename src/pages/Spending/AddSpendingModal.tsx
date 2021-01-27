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
          <div className='mt-6'>
            {transactionEntity ? (
              <Input
                label='Creditor Name'
                name='entity'
                defaultValue={transactionEntity.name}
              />
            ) : (
              (type === 'Credit' || type === 'Debit') && (
                <CreditorsSelect
                  formError={formErrors.entity}
                  resetForm={resetForm}
                  resetFormError={resetFormErrors}
                />
              )
            )}
          </div>
          <div className='mt-6'>
            <Input
              name='amount'
              type='tel'
              placeHolder='0.00'
              label='Amount'
              subContent={formErrors.amount.error && formErrors.amount.content}
              theme={formErrors.amount.error ? INPUT_THEME_ERROR : ''}
              resetField={resetForm}
              setResetField={() => setResetForm(false)}
              resetFormErrors={resetFormErrors}
              validator={AmountValidator}
              valueFormatter={NumberWithCommasFormatter}
              onBlurUpdate={handleInputChange('ADD_TRANSACTION_AMOUNT')}
            />
          </div>
          <div className='mt-6'>
            {/* TODO: Validate date input and create date picker UI */}
            <Input
              name='date'
              placeHolder='MM/DD/YYYY'
              label='Transaction Date'
              subContent={formErrors.date.error && formErrors.date.content}
              theme={formErrors.date.error ? INPUT_THEME_ERROR : ''}
              resetField={resetForm}
              setResetField={() => setResetForm(false)}
              resetFormErrors={resetFormErrors}
              onBlurUpdate={handleInputChange('ADD_TRANSACTION_DATE')}
            />
          </div>
          <div className='mt-10'>
            <Button
              buttonText='Add Transaction'
              onClickHandler={(e) => handleSubmit(e)}
              loading={isTransactionBeingAdded}
              type='submit'
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddSpendingModal;
