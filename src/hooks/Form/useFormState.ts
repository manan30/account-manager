import { useCallback, useState } from 'react';

export const useFormState = <FormValues, FormErrors>(formState: {
  initialValues: FormValues;
  initialErrors: FormErrors;
}): {
  values: FormValues;
  errors: FormErrors;
  setFormValues: (name: string, value: string) => void;
} => {
  const [formValues, setFormValues] = useState<FormValues>(
    formState.initialValues
  );
  const [formErrors, setFormErrors] = useState<FormErrors>(
    formState.initialErrors
  );

  const handleFormValueChange = useCallback(
    (name: string, value: string) => {
      if (formErrors[name])
        setFormErrors((prevState) => ({ ...prevState, [name]: false }));
      setFormValues((prevState) => ({ ...prevState, [name]: value }));
    },
    [formErrors]
  );

  return {
    values: formValues,
    errors: formErrors,
    setFormValues: handleFormValueChange
  };
};
