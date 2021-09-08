import React, { useCallback } from 'react';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';
import Select from '../../components/Select/Select';
import { useFormState } from '../../hooks/Form/useFormState';
import { formFields } from './utils/constants';
import { FormState } from './utils/types';

type RecurringEntryModalProps = {
  handleSubmit: (formValues: Record<FormState, string>) => void;
  handleClose: () => void;
};

const RecurringEntryModal: React.FC<RecurringEntryModalProps> = ({
  handleSubmit,
  handleClose
}) => {
  const { values, errors, setFormValues, setFormErrors } = useFormState<
    Record<FormState, string>,
    Record<FormState, boolean>
  >({
    initialValues: { name: '', amount: '', date: '', type: '', endingDate: '' },
    initialErrors: {
      name: false,
      amount: false,
      date: false,
      type: false,
      endingDate: false
    }
  });

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formErrors: Array<string> = [];
      Object.entries(values).forEach(([key, value]) => {
        if (!value || value.trim() === '') formErrors.push(key);
      });
      if (formErrors.length) {
        setFormErrors(formErrors);
        return;
      }
      handleSubmit(values);
    },
    [values, handleSubmit, setFormErrors]
  );

  return (
    <Modal title='Add Recurring Transaction' onCloseIconClick={handleClose}>
      <div className='mb-4'>
        <form
          className='flex flex-col p-1 space-y-4'
          onSubmit={handleFormSubmit}
        >
          {formFields.map((field) => {
            switch (field.type) {
              case 'select':
                return (
                  <Select
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    value={values[field.name]}
                    error={errors[field.name]}
                    placeholder={field.placeholder}
                    options={['Credit', 'Debit']}
                    onChange={(name, value) =>
                      setFormValues(name as FormState, value)
                    }
                  />
                );
              default:
                return (
                  <Input
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    value={values[field.name]}
                    error={errors[field.name]}
                    type={field?.inputType}
                    placeholder={field.placeholder}
                    onChange={(name, value) =>
                      setFormValues(name as FormState, value)
                    }
                  />
                );
            }
          })}
          <input
            type='submit'
            className='w-full mt-4 btn btn-primary'
            value='Login'
          />
        </form>
      </div>
    </Modal>
  );
};

export default RecurringEntryModal;
