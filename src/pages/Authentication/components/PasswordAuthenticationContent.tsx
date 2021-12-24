import React, { useCallback, useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input/Input';
import { useFormState } from '../../../hooks/Form/useFormState';
import { useFirebaseContext } from '../../../providers/FirebaseProvider';
import { useNotificationDispatch } from '../../../providers/NotificationProvider';
import { usePasswordAuth } from '../../../services/firebase/hooks/usePasswordAuth';
import { NOTIFICATION_THEME_FAILURE } from '../../../utils/Constants/ThemeConstants';
import { EmailSignInFields, FormErrors, FormState } from '../interfaces';
import { emailSignInFormFields } from '../utils/constants';
import PasswordResetModal from './PasswordResetModal';

const PasswordAuthenticationContent = () => {
  const { auth } = useFirebaseContext();
  const notificationDispatch = useNotificationDispatch();
  const { processing, handlePasswordAuth } = usePasswordAuth();
  const { errors, values, setFormValues, setFormErrors } = useFormState<
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

  const handlePasswordReset = (e: React.MouseEvent<HTMLButtonElement>) => {
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

    auth
      .sendPasswordResetEmail(values.email)
      .then(() => {
        setShowPasswordResetModal(true);
      })
      .catch((err) => {
        notificationDispatch({
          type: 'ADD_NOTIFICATION',
          payload: { content: err.message, theme: NOTIFICATION_THEME_FAILURE }
        });
      });
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
          onClick={handlePasswordReset}
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
          hideModal={() => setShowPasswordResetModal(false)}
        />
      ) : null}
    </>
  );
};

export default PasswordAuthenticationContent;
