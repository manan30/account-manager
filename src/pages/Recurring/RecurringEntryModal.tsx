import React, { useCallback, useState } from 'react';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';

const formFields = [{ name: 'name', label: 'Name' }] as const;

type FormState = typeof formFields[number]['name'];

const RecurringEntryModal = () => {
  const [formState, setFormState] = useState<Record<FormState, string>>({
    name: ''
  });

  const handleFormStateChange = useCallback((name: string, value: string) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  return (
    <Modal title='Add Recurring Transaction'>
      <div>
        <form className='flex space-y-4'>
          {formFields.map((field) => (
            <Input
              key={field.name}
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
