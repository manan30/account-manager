import React, { useCallback, useMemo, useState } from 'react';
import Modal from '../../components/Modal';
import Select, { SelectOption } from '../../components/Select';
import useGetStoreNames from '../../hooks/Stores';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { INPUT_THEME_ERROR } from '../../utils/Constants/ThemeConstants';

type AddSpendingModalProps = {
  handleModalClose: () => void;
};

const AddSpendingModal: React.FC<AddSpendingModalProps> = ({
  handleModalClose
}) => {
  const { firestore } = useFirebaseContext();
  const {
    data: storeNames,
    error,
    isLoading: fetchingStores
  } = useGetStoreNames();
  const [formState, setFormState] = useState({
    storeName: '',
    categoryName: ''
  });
  const [formErrors, setFormErrors] = useState({
    storeName: { error: false, content: '' },
    category: { error: false, content: '' },
    amount: { error: false, content: '' },
    date: { error: false, content: '' }
  });
  const [resetForm, setResetForm] = useState(false);

  const resetFormErrors = useCallback(
    (name: string) =>
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: { error: false, content: '' }
      })),
    []
  );

  const storeNameDropdownOptions = useMemo(() => {
    if (storeNames && storeNames.length > 0) {
      return storeNames.map(({ name }) => ({
        label: name.toLowerCase(),
        value: name
      })) as SelectOption[];
    }
    return [] as SelectOption[];
  }, [storeNames]);

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Modal isOpen onCloseClickHandler={handleModalClose}>
      <div className='flex justify-center mx-8'>
        <form className='mb-8 w-full'>
          <Select
            name='storeName'
            label='Store Name'
            placeHolder='Eg. Aldi, Target'
            selectOptions={storeNameDropdownOptions}
            subContent={
              formErrors.storeName.error && formErrors.storeName.content
            }
            theme={formErrors.storeName.error ? INPUT_THEME_ERROR : ''}
            resetField={resetForm}
            setResetField={() => setResetForm(false)}
            resetFormErrors={resetFormErrors}
            onSelectValueChange={(name, { value }) =>
              handleSelectChange(name, value)
            }
            isLoading={fetchingStores}
          />
          <Select
            name='categoryName'
            label='Category Name'
            placeHolder='Eg. Rent, Groceries'
            selectOptions={storeNameDropdownOptions}
            subContent={
              formErrors.category.error && formErrors.category.content
            }
            theme={formErrors.category.error ? INPUT_THEME_ERROR : ''}
            resetField={resetForm}
            setResetField={() => setResetForm(false)}
            resetFormErrors={resetFormErrors}
            onSelectValueChange={(name, { value }) =>
              handleSelectChange(name, value)
            }
            isLoading={fetchingStores}
          />
        </form>
      </div>
    </Modal>
  );
};

export default AddSpendingModal;
