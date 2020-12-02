import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Label from '../Label';
import { INPUT_THEME_ERROR } from '../../utils/Constants/ThemeConstants';
import { isEmptyString } from '../../utils/Functions';

function Input({
  type,
  required,
  name,
  placeHolder,
  label,
  setFormState,
  subContent,
  theme,
  onBlurUpdate,
  resetField,
  valueFormatter,
  validator,
  resetFormErrors
}) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState({ status: false, message: '' });

  const handleChange = (e) => {
    e.persist();

    if (subContent && !isEmptyString(subContent) && resetFormErrors) {
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

    // if (valueFormatter && !isEmptyString(inputValue))
    //   setInputValue(valueFormatter.unFormat(e.target.value));
    // else setInputValue(e.target.value);

    if (setFormState)
      setFormState((prevState) => ({ ...prevState, [name]: currentValue }));
  };

  useEffect(() => {
    if (resetField) {
      setInputValue('');
      if (onBlurUpdate) onBlurUpdate('', name);
    }
  }, [resetField, name, onBlurUpdate]);

  useEffect(() => {
    if (validator && !isEmptyString(inputValue)) {
      const { testFailed, errorMessage } = validator(inputValue);
      if (testFailed) {
        setError({ error: true, message: errorMessage });
      } else {
        setError({ error: false, message: '' });
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
            'border-solid border-2 rounded-lg p-2 w-full mt-2 focus:outline-none focus:ring',
            (theme && theme === INPUT_THEME_ERROR) || error.status
              ? 'border-red-500 text-red-500'
              : 'border-gray-400'
          )}
          onBlur={() => {
            if (onBlurUpdate) onBlurUpdate(inputValue, name);
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
}

Input.propTypes = {
  type: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  label: PropTypes.string.isRequired,
  setFormState: PropTypes.func,
  onBlurUpdate: PropTypes.func,
  subContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType,
    PropTypes.bool
  ]),
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  resetField: PropTypes.bool,
  valueFormatter: PropTypes.shape({
    format: PropTypes.func,
    unFormat: PropTypes.func
  }),
  validator: PropTypes.func
};

Input.defaultProps = {
  type: 'text',
  required: true,
  placeHolder: '',
  setFormState: undefined,
  onBlurUpdate: undefined,
  subContent: undefined,
  theme: '',
  resetField: undefined,
  valueFormatter: undefined,
  validator: undefined
};

export default Input;
