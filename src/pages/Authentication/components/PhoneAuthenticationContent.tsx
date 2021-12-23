import React, { useCallback } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select';
import { useFormState } from '../../../hooks/Form/useFormState';
import { usePhoneAuth } from '../../../services/firebase/hooks/usePhoneAuth';
import { FormErrors, FormState, PhoneSignInFields } from '../interfaces';
import { phoneSignInFormFields } from '../utils/constants';
import VerificationCodeModal from './VerificationCodeModal';

const PhoneAuthenticationContent = () => {
  const { errors, values, setFormValues, setFormErrors } = useFormState<
    FormState<PhoneSignInFields>,
    FormErrors<PhoneSignInFields>
  >({
    initialValues: {
      countryCode: '',
      phoneNumber: ''
    },
    initialErrors: {
      countryCode: false,
      phoneNumber: false
    }
  });
  const {
    reCaptchaVerifierRef,
    awaitingVerificationCode,
    processingPhoneNumberStep,
    processingVerificationCodeStep,
    handleVerificationCodeStep,
    setAwaitingVerificationCode,
    handlePhoneNumberStep
  } = usePhoneAuth();

  const handleFormSubmit = useCallback(
    async (
      e:
        | React.FormEvent<HTMLFormElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      const formErrors: Array<string> = [];
      const { phoneNumber, countryCode } = values;

      [{ phoneNumber }, { countryCode }].forEach((item) => {
        const [key, value] = Object.entries(item)[0];
        if (value?.trim() === '') formErrors.push(key);
      });

      if (formErrors.length) {
        setFormErrors(formErrors);
        return;
      }

      const code = countryCode.split(' ')[0];
      handlePhoneNumberStep(`${code}${phoneNumber}`);
    },
    [values, setFormErrors, handlePhoneNumberStep]
  );

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className='flex flex-col w-full space-y-6'
      >
        <div>
          <div className='flex space-x-4'>
            {phoneSignInFormFields.map((field, idx) =>
              idx === 0 ? (
                <Select
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  value={values[field.name]}
                  error={errors[field.name]}
                  placeholder={field.placeholder}
                  options={['+1 USA / Canada', '+91 India']}
                  onChange={(name, value) =>
                    setFormValues(name as PhoneSignInFields, value)
                  }
                />
              ) : (
                <Input
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  value={values[field.name]}
                  error={errors[field.name]}
                  type={field.type}
                  placeholder={field.placeholder}
                  onChange={(name, value) =>
                    setFormValues(name as PhoneSignInFields, value)
                  }
                />
              )
            )}
          </div>
          <div ref={reCaptchaVerifierRef} id='recaptcha-container'></div>
        </div>

        <Button
          layout='primary'
          className='flex items-center w-full hover:shadow'
          type='submit'
          disabled={processingPhoneNumberStep}
          loading={processingPhoneNumberStep}
        >
          Sign In
        </Button>
      </form>
      {awaitingVerificationCode ? (
        <VerificationCodeModal
          processingVerificationCodeStep={processingVerificationCodeStep}
          handleVerificationCodeStep={handleVerificationCodeStep}
          hideModal={(status) => setAwaitingVerificationCode(status)}
        />
      ) : null}
    </>
  );
};

export default PhoneAuthenticationContent;
