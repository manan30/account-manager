import React, { useCallback, useState } from 'react';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';

const formFields = [
  { name: 'name', label: 'Name' },
  { name: 'amount', label: 'Amount' }
] as const;

type FormState = typeof formFields[number]['name'];

const RecurringEntryModal = () => {
  const [formState, setFormState] = useState<Record<FormState, string>>({
    name: '',
    amount: ''
  });

  const handleFormStateChange = useCallback((name: string, value: string) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  return (
    <Modal title='Add Recurring Transaction'>
      <div>
        <form className='flex flex-col p-1 space-y-4'>
          {formFields.map((field) => (
            <Input
              key={field.name}
              name={field.name}
              label={field.label}
              value={formState[field.name]}
              onChange={handleFormStateChange}
            />
          ))}
        </form>
      </div>
    </Modal>
  );
};

export default RecurringEntryModal;
