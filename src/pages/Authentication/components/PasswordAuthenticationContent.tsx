import React, { useCallback, useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input/Input';
import { useForm } from '../../../hooks/Form/useForm';
import { usePasswordAuth } from '../../../services/firebase/hooks/usePasswordAuth';
import { EmailSignInFields, FormErrors, FormState } from '../interfaces';
import { emailSignInFormFields } from '../utils/constants';
import PasswordResetModal from './PasswordResetModal';

const PasswordAuthenticationContent = () => {
  const { processing, handlePasswordAuth } = usePasswordAuth();
  const { errors, values, setFormValues, setFormErrors } = useForm<
    FormState<EmailSignInFields>,
    FormErrors<EmailSignInFields>
  >({
    initialValues: {
      email: '',
      password: ''
    },
    initialErrors: {
      email: false,
      password: false
    }
  });

  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);

  const handleFormSubmit = useCallback(
    async (
      e:
        | React.FormEvent<HTMLFormElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      const formErrors: Array<string> = [];
      const { email, password } = values;

      [{ email }, { password }].forEach((item) => {
        const [key, value] = Object.entries(item)[0];
        if (value?.trim() === '') formErrors.push(key);
      });

      if (formErrors.length) {
        setFormErrors(formErrors);
        return;
      }

      handlePasswordAuth(email, password);
    },
    [values, handlePasswordAuth, setFormErrors]
  );

  const handlePasswordResetCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formErrors: Array<string> = [];
    const { email } = values;

    [{ email }].forEach((item) => {
      const [key, value] = Object.entries(item)[0];
      if (value?.trim() === '') formErrors.push(key);
    });

    if (formErrors.length) {
      setFormErrors(formErrors);
      return;
    }

    setShowPasswordResetModal(true);
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className='flex flex-col w-full space-y-4'
      >
        {emailSignInFormFields.map((field) => (
          <Input
            key={field.name}
            name={field.name}
            label={field.label}
            value={values[field.name]}
            error={errors[field.name]}
            type={field.type}
            placeholder={field.placeholder}
            onChange={(name, value) =>
              setFormValues(name as EmailSignInFields, value)
            }
          />
        ))}

        <button
          className='text-indigo-600 text-xs text-left max-w-max p-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-indigo-600'
          onClick={handlePasswordResetCheck}
          type='reset'
        >
          Forgot Password?
        </button>

        <Button
          layout='primary'
          className='flex items-center w-full hover:shadow'
          type='submit'
          disabled={processing}
          loading={processing}
        >
          Sign In
        </Button>
      </form>
      {showPasswordResetModal ? (
        <PasswordResetModal
          email={values.email}
          hideModal={() => setShowPasswordResetModal(false)}
        />
      ) : null}
    </>
  );
};

export default PasswordAuthenticationContent;
