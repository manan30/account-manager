import React, { useCallback } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input/Input';
import Modal from '../../../components/Modal/Modal';
import { useFormState } from '../../../hooks/Form/useFormState';

type VerificationCodeModalProps = {
  processingVerificationCodeStep: boolean;
  hideModal: (status: false) => void;
  handleVerificationCodeStep: (verificationCode: string) => Promise<void>;
};

type FormField = 'verificationCode';

const VerificationCodeModal: React.FC<VerificationCodeModalProps> = ({
  processingVerificationCodeStep,
  hideModal,
  handleVerificationCodeStep
}) => {
  const { errors, values, setFormValues, setFormErrors } = useFormState({
    initialValues: { verificationCode: '' },
    initialErrors: { verificationCode: false }
  });

  const handleFormSubmit = useCallback(
    async (
      e:
        | React.FormEvent<HTMLFormElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      const formErrors: Array<string> = [];
      const { verificationCode } = values;

      [{ verificationCode }].forEach((item) => {
        const [key, value] = Object.entries(item)[0];
        if (value?.trim() === '') formErrors.push(key);
      });

      if (formErrors.length) {
        setFormErrors(formErrors);
        return;
      }

      handleVerificationCodeStep(verificationCode);
    },
    [handleVerificationCodeStep, setFormErrors, values]
  );

  return (
    <Modal
      size='small'
      title='Verification Code'
      onCloseIconClick={() => hideModal(false)}
    >
      <p className='text-sm tracking-wide font-medium text-gray-400 text-center mb-6'>
        Please enter the verification code that we sent to your phone
      </p>
      <form
        onSubmit={handleFormSubmit}
        className='flex flex-col w-full space-y-6 mb-4'
      >
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
          disabled={processingVerificationCodeStep}
          loading={processingVerificationCodeStep}
        >
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default VerificationCodeModal;
