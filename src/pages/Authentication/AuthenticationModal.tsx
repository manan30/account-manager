import React from 'react';
import { MailIcon } from '@heroicons/react/solid';
import Modal from '../../components/Modal/Modal';
import { ReactComponent as GoogleIcon } from '../../assets/svg/google-icon.svg';
import { useFormState } from '../../hooks/Form/useFormState';
import type { FormState, FormErrors, Fields } from './interfaces';
import Input from '../../components/Input/Input';
import { FormFields as formFields } from './utils/constants';
import Button from '../../components/Button';

type AuthenticationModalProps = {
  onGoogleAuthClicked: () => void;
};

const AuthenticationModal: React.FC<AuthenticationModalProps> = () => {
  const { errors, values, setFormValues } = useFormState<FormState, FormErrors>(
    {
      initialValues: { phoneNumber: '' },
      initialErrors: { phoneNumber: false }
    }
  );

  return (
    <Modal title=''>
      <div className='flex flex-col items-center justify-center flex-auto h-full mx-8 mb-4 space-y-6'>
        {formFields.map((field) => (
          <Input
            key={field.name}
            name={field.name}
            label={field.label}
            value={values[field.name]}
            error={errors[field.name]}
            type={field?.inputType}
            placeholder={field.placeholder}
            onChange={(name, value) => setFormValues(name as Fields, value)}
          />
        ))}

        <hr className='w-full' />

        <Button
          layout='secondary'
          className='flex items-center w-full hover:shadow'
        >
          <MailIcon className='w-6 h-6 mr-2' />
          <span className='text-sm font-semibold tracking-wide text-gray-800'>
            Sign in with Email
          </span>
        </Button>

        <Button
          layout='secondary'
          className='flex items-center w-full bg-gray-100 border border-gray-300 border-solid hover:shadow'
        >
          <div className='w-5 h-5 mr-2'>
            <GoogleIcon />
          </div>
          <span className='text-sm font-semibold tracking-wide'>
            Sign in with Google
          </span>
        </Button>

        {/* <button
          className='flex items-center justify-center w-full p-2 rounded-md shadow'
          onClick={onGoogleAuthClicked}
        >

        </button> */}
      </div>
    </Modal>
  );
};

export default AuthenticationModal;
