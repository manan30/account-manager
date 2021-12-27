import { useCallback, useState } from 'react';

type FormErrors<T extends string> = Record<T, boolean>;
type FormValues<T extends string> = Record<T, string>;

export const useForm = <FormFields extends string>(formState: {
  initialValues: FormValues<FormFields>;
}) => {
  const [formValues, setFormValues] = useState<FormValues<FormFields>>(
    formState.initialValues
  );
  const [formErrors, setFormErrors] = useState<FormErrors<FormFields>>(() =>
    Object.keys(formState.initialValues).reduce((acc, curr) => {
      acc[curr as FormFields] = false;
      return acc;
    }, {} as FormErrors<FormFields>)
  );

  const handleFormValueChange = useCallback(
    (name: keyof FormErrors<FormFields>, value: string) => {
      if (formErrors[name])
        setFormErrors((prevState) => ({ ...prevState, [name]: false }));
      setFormValues((prevState) => ({ ...prevState, [name]: value }));
    },
    [formErrors]
  );

  const handleFormErrorsChange = useCallback((errorKeys: Array<string>) => {
    const updatedErrorState = {} as FormErrors<FormFields>;
    errorKeys.forEach((key) => {
      (updatedErrorState[
        key as keyof FormErrors<FormFields>
      ] as unknown) = true;
    });
    setFormErrors(updatedErrorState);
  }, []);

  const resetForm = useCallback(() => {
    setFormValues(formState.initialValues);
    setFormErrors(
      Object.keys(formState.initialValues).reduce((acc, curr) => {
        acc[curr as FormFields] = false;
        return acc;
      }, {} as FormErrors<FormFields>)
    );
  }, [formState]);

  return {
    values: formValues,
    errors: formErrors,
    setValues: setFormValues,
    setFormValues: handleFormValueChange,
    setFormErrors: handleFormErrorsChange,
    resetForm
  };
};
