import React, { useCallback } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input/Input';
import { useFormState } from '../../../hooks/Form/useFormState';
import { usePasswordAuth } from '../../../services/firebase/hooks/usePasswordAuth';
import { EmailSignInFields, FormErrors, FormState } from '../interfaces';
import { emailSignInFormFields } from '../utils/constants';

const PasswordAuthenticationContent = () => {
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

  const handleFormSubmit = useCallback(
    async (
      e:
        | React.FormEvent<HTMLFormElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      const formErrors: Array<string> = [];
      const { email, password } = values;

      // Required fields check
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

  return (
    <form
      onSubmit={handleFormSubmit}
      className='flex flex-col w-full space-y-6'
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
  );
};

export default PasswordAuthenticationContent;
