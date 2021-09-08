import { useCallback, useState } from 'react';

export const useFormState = <FormState>(formState: {
  initialValues: FormState;
  initialErrors: FormState;
}): {
  values: FormState;
  errors: FormState;
  setFormValues: (name: keyof FormState, value: string) => void;
  setFormErrors: (errorKeys: Array<string>) => void;
} => {
  const [formValues, setFormValues] = useState<FormState>(
    formState.initialValues
  );
  const [formErrors, setFormErrors] = useState<FormState>(
    formState.initialErrors
  );

  const handleFormValueChange = useCallback(
    (name: keyof FormState, value: string) => {
      if (formErrors[name])
        setFormErrors((prevState) => ({ ...prevState, [name]: false }));
      setFormValues((prevState) => ({ ...prevState, [name]: value }));
    },
    [formErrors]
  );

  const handleFormErrorsChange = useCallback(
    (errorKeys: Array<string>) => {
      const updatedErrorState = (Object.keys(formErrors).map((key) => {
        if (errorKeys.includes(key)) return { [key]: true };
        return { [key]: false };
      }) as unknown) as FormState;
      setFormErrors(updatedErrorState);
    },
    [formErrors]
  );

  return {
    values: formValues,
    errors: formErrors,
    setFormValues: handleFormValueChange,
    setFormErrors: handleFormErrorsChange
  };
};
