import React from 'react';
import Input from '../../components/Input/Input';
import { InputType } from '../../components/Input/interfaces';
import Modal from '../../components/Modal/Modal';
import Select from '../../components/Select/Select';
import { useFormState } from '../../hooks/Form/useFormState';

type FormField = {
  name: string;
  label: string;
  placeholder: string;
  inputType?: InputType;
  type?: string;
};

const formFields: ReadonlyArray<FormField> = [
  { name: 'name', label: 'Name', placeholder: 'Enter Name' },
  { name: 'amount', label: 'Amount', placeholder: 'Enter Amount' },
  {
    name: 'date',
    label: 'Recurring Date',
    placeholder: 'Enter Recurring Date',
    inputType: 'date'
  },
  {
    name: 'type',
    label: 'Transaction Type',
    placeholder: 'Select Transaction Type',
    type: 'select'
  },
  {
    name: 'endingDate',
    label: 'Ending Date',
    placeholder: 'Enter Ending Date',
    inputType: 'date'
  }
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
    initialValues: { name: '', amount: '', date: '', type: '' },
    initialErrors: { name: false, amount: false, date: false, type: false }
  });

  return (
    <Modal title='Add Recurring Transaction' onCloseIconClick={handleClose}>
      <div className='mb-4'>
        <form className='flex flex-col p-1 space-y-4'>
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
        </form>
      </div>
    </Modal>
  );
};

export default RecurringEntryModal;
