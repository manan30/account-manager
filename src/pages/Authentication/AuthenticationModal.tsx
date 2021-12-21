import React, { useCallback, useState } from 'react';
import { MailIcon, PhoneIcon } from '@heroicons/react/solid';
import Modal from '../../components/Modal/Modal';
import { ReactComponent as GoogleIcon } from '../../assets/svg/google-icon.svg';
import { useFormState } from '../../hooks/Form/useFormState';
import type { FormState, FormErrors, Fields } from './interfaces';
import Input from '../../components/Input/Input';
import {
  phoneSignInFormFields,
  emailSignInFormFields
} from './utils/constants';
import Button from '../../components/Button';

type AuthenticationModalProps = {
  onGoogleAuthClicked: () => void;
};

type SignInProvider = 'phone' | 'email';

const AuthenticationModal: React.FC<AuthenticationModalProps> = () => {
  const [signInProvider, setSignInProvider] = useState<SignInProvider>('phone');
  const {
    errors,
    values,
    setFormValues,
    setFormErrors,
    resetForm
  } = useFormState<FormState, FormErrors>({
    initialValues: { phoneNumber: '', email: '', password: '' },
    initialErrors: { phoneNumber: false, email: false, password: false }
  });

  const toggleSignInProvider = () => {
    setSignInProvider((prevState) =>
      prevState === 'email' ? 'phone' : 'email'
    );
    resetForm();
  };

  const handleFormSubmit = useCallback(
    async (
      e:
        | React.FormEvent<HTMLFormElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      const formErrors: Array<string> = [];
      const { email, password, phoneNumber } = values;

      // Required fields check
      [{ email }, { password }, { phoneNumber }]
        .filter((field) =>
          signInProvider === 'email'
            ? phoneSignInFormFields.findIndex(
                (element) => element.name === Object.keys(field)[0]
              )
            : emailSignInFormFields.findIndex(
                (element) => element.name === Object.keys(field)[0]
              )
        )
        .forEach((item) => {
          const [key, value] = Object.entries(item)[0];
          if (value.trim() === '') formErrors.push(key);
        });

      if (formErrors.length) {
        setFormErrors(formErrors);
        return;
      }
    },
    [signInProvider, values, setFormErrors]
  );

  return (
    <Modal title=''>
      <div className='flex flex-col items-center justify-center flex-auto h-full mx-8 mb-4 space-y-6'>
        <form
          onSubmit={handleFormSubmit}
          className='flex flex-col w-full space-y-6'
        >
          {signInProvider === 'phone'
            ? phoneSignInFormFields.map((field) => (
                <Input
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  value={values[field.name]}
                  error={errors[field.name]}
                  type={field.type}
                  placeholder={field.placeholder}
                  onChange={(name, value) =>
                    setFormValues(name as Fields, value)
                  }
                />
              ))
            : null}

          {signInProvider === 'email'
            ? emailSignInFormFields.map((field) => (
                <Input
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  value={values[field.name]}
                  error={errors[field.name]}
                  type={field.type}
                  placeholder={field.placeholder}
                  onChange={(name, value) =>
                    setFormValues(name as Fields, value)
                  }
                />
              ))
            : null}

          <Button
            layout='primary'
            className='flex items-center w-full hover:shadow'
            type='submit'
          >
            Sign In
          </Button>
        </form>

        <hr className='w-full' />

        <Button
          layout='secondary'
          className='flex items-center w-full hover:shadow'
          onClick={toggleSignInProvider}
        >
          {signInProvider === 'email' ? (
            <PhoneIcon className='w-5 h-5 mr-2' />
          ) : (
            <MailIcon className='w-6 h-6 mr-2' />
          )}
          <span className='text-sm font-semibold tracking-wide text-gray-800'>
            Sign in with {signInProvider === 'email' ? 'Phone' : 'Email'}
          </span>
        </Button>

        <Button
          layout='secondary'
          className='flex items-center w-full bg-gray-100 border border-gray-300 border-solid hover:shadow'
        >
          <div className='w-4 h-4 mr-2'>
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
