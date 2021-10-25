import { useCallback, useState } from 'react';

export const useFormState = <FormValues, FormErrors>(formState: {
  initialValues: FormValues;
  initialErrors: FormErrors;
}): {
  values: FormValues;
  errors: FormErrors;
  setFormValues: (name: keyof FormErrors, value: string) => void;
  setFormErrors: (errorKeys: Array<string>) => void;
  resetForm: () => void;
} => {
  const [formValues, setFormValues] = useState<FormValues>(
    formState.initialValues
  );
  const [formErrors, setFormErrors] = useState<FormErrors>(
    formState.initialErrors
  );

  const handleFormValueChange = useCallback(
    (name: keyof FormErrors, value: string) => {
      if (formErrors[name])
        setFormErrors((prevState) => ({ ...prevState, [name]: false }));
      setFormValues((prevState) => ({ ...prevState, [name]: value }));
    },
    [formErrors]
  );

  const handleFormErrorsChange = useCallback(
    (errorKeys: Array<string>) => {
      const updatedErrorState = { ...formErrors };
      errorKeys.forEach((key) => {
        (updatedErrorState[key as keyof FormErrors] as unknown) = true;
      });
      setFormErrors(updatedErrorState);
    },
    [formErrors]
  );

  const resetForm = useCallback(() => {
    setFormValues(formState.initialValues);
    setFormErrors(formState.initialErrors);
  }, [formState]);

  return {
    values: formValues,
    errors: formErrors,
    setFormValues: handleFormValueChange,
    setFormErrors: handleFormErrorsChange,
    resetForm
  };
};
