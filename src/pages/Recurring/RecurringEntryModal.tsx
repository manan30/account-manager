import React from 'react';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';
import { useFormState } from '../../hooks/Form/useFormState';

const formFields = [
  { name: 'name', label: 'Name', placeholder: 'Enter Name' },
  { name: 'amount', label: 'Amount', placeholder: 'Enter Amount' }
] as const;

type FormState = typeof formFields[number]['name'];

type RecurringEntryModalProps = {
  handleClose: () => void;
};

const RecurringEntryModal: React.FC<RecurringEntryModalProps> = ({
  handleClose
}) => {
  const { values, errors, setFormValues } = useFormState<
    Record<FormState, string>,
    Record<FormState, boolean>
  >({
    initialValues: { name: '', amount: '' },
    initialErrors: { name: false, amount: false }
  });

  return (
    <Modal title='Add Recurring Transaction' onCloseIconClick={handleClose}>
      <div>
        <form className='flex flex-col p-1 space-y-4'>
          {formFields.map((field) => (
            <Input
              key={field.name}
              name={field.name}
              label={field.label}
              value={values[field.name]}
              error={errors[field.name]}
              placeholder={field.placeholder}
              onChange={(name, value) =>
                setFormValues(name as FormState, value)
              }
            />
          ))}
        </form>
      </div>
    </Modal>
  );
};

export default RecurringEntryModal;
