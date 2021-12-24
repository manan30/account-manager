import React, { useCallback } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input/Input';
import Modal from '../../../components/Modal/Modal';
import { useFormState } from '../../../hooks/Form/useFormState';
// import { useResetPassword } from '../../../services/firebase/hooks/useResetPassword';

type PasswordResetModalProps = {
  hideModal: () => void;
};

type FormField = 'newPassword' | 'verificationCode';

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  hideModal
}) => {
  // const { handleResetPassword } = useResetPassword();
  const { errors, values, setFormValues, setFormErrors } = useFormState({
    initialValues: { newPassword: '', verificationCode: '' },
    initialErrors: { newPassword: false, verificationCode: false }
  });

  const handleFormSubmit = useCallback(
    async (
      e:
        | React.FormEvent<HTMLFormElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      const formErrors: Array<string> = [];
      const { newPassword, verificationCode } = values;

      [{ newPassword }, { verificationCode }].forEach((item) => {
        const [key, value] = Object.entries(item)[0];
        if (value?.trim() === '') formErrors.push(key);
      });

      if (formErrors.length) {
        setFormErrors(formErrors);
        return;
      }

      // handleResetPassword(email);
    },
    [values, setFormErrors]
  );

  return (
    <Modal size='small' title='Verification Code' onCloseIconClick={hideModal}>
      <p className='text-sm tracking-wide font-medium text-gray-400 text-center mb-6'>
        Please enter the verification code that we sent to your email as well as
        the new password
      </p>
      <form
        onSubmit={handleFormSubmit}
        className='flex flex-col w-full space-y-6 mb-4'
      >
        <Input
          name='newPassword'
          label='New Password'
          value={values.newPassword}
          error={errors.newPassword}
          type='password'
          placeholder='Password'
          onChange={(name, value) => setFormValues(name as FormField, value)}
        />

        <Input
          name='verificationCode'
          label='Verification Code'
          value={values.verificationCode}
          error={errors.verificationCode}
          type='text'
          placeholder='123456'
          onChange={(name, value) => setFormValues(name as FormField, value)}
        />

        <Button
          layout='primary'
          className='flex items-center w-full hover:shadow'
          type='submit'
          // disabled={processingVerificationCodeStep}
          // loading={processingVerificationCodeStep}
        >
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default PasswordResetModal;
