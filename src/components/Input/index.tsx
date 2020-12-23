import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Label from '../Label';
import { INPUT_THEME_ERROR } from '../../utils/Constants/ThemeConstants';
import { isEmptyString } from '../../utils/Functions';

type InputProps = {
  type?: string;
  required?: boolean;
  name: string;
  placeHolder?: string;
  label: string;
  setFormState?: (name: string, value: string) => void;
  onBlurUpdate?: (name: string, value: string) => void;
  subContent?: React.ReactNode;
  theme?: string;
  resetField?: boolean;
  valueFormatter?: {
    format: (value: string) => string;
    unFormat: (value: string) => string;
  };
  validator?: (value: string) => { testFailed: boolean; errorMessage: string };
  resetFormErrors?: (name: string) => void;
};

const Input: React.FC<InputProps> = ({
  type = 'text',
  required = true,
  name,
  placeHolder = '',
  label,
  setFormState,
  subContent,
  theme,
  onBlurUpdate,
  resetField,
  valueFormatter,
  validator,
  resetFormErrors
}) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState({ status: false, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();

    if (subContent && !isEmptyString(subContent as string) && resetFormErrors) {
      resetFormErrors(name);
    }
    const currentValue = valueFormatter
      ? valueFormatter.unFormat(e.target.value)
      : e.target.value;

    if (validator && !isEmptyString(currentValue)) {
      const { testFailed, errorMessage } = validator(currentValue);
      if (testFailed) {
        setError({ status: true, message: errorMessage });
        return;
      }
      setError({ status: false, message: '' });
    }

    setInputValue(currentValue);

    if (setFormState) setFormState(name, currentValue);
  };

  useEffect(() => {
    if (resetField) {
      setInputValue('');
      if (onBlurUpdate) onBlurUpdate(name, '');
    }
  }, [resetField, name, onBlurUpdate]);

  useEffect(() => {
    if (validator && !isEmptyString(inputValue)) {
      const { testFailed, errorMessage } = validator(inputValue);
      if (testFailed) {
        setError({ status: true, message: errorMessage });
      } else {
        setError({ status: false, message: '' });
      }
    }
  }, [inputValue, validator]);

  return (
    <>
      <Label name={name} label={label}>
        <input
          id={name}
          type={type}
          name={name}
          value={
            valueFormatter && !isEmptyString(inputValue)
              ? valueFormatter.format(inputValue)
              : inputValue
          }
          required={required}
          onChange={handleChange}
          placeholder={placeHolder}
          className={cn(
            'border-solid border-2 rounded-lg p-2 w-full mt-2 focus:outline-none focus:ring text-sm',
            (theme && theme === INPUT_THEME_ERROR) || error.status
              ? 'border-red-500 text-red-500'
              : 'border-gray-400'
          )}
          onBlur={() => {
            if (onBlurUpdate) onBlurUpdate(name, inputValue);
          }}
        />
      </Label>
      {(subContent || !isEmptyString(error.message)) && (
        <div
          className={cn(
            'mt-1 text-sm',
            ((theme && theme === INPUT_THEME_ERROR) ||
              !isEmptyString(error.message)) &&
              'text-red-600'
          )}
        >
          <div>{subContent}</div>
          <div>{!isEmptyString(error.message) && error.message}</div>
        </div>
      )}
    </>
  );
};

export default Input;
