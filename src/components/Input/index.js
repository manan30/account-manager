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
  valueFormatter
}) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    e.persist();
    if (valueFormatter && !isEmptyString(inputValue))
      setInputValue(valueFormatter.unFormat(e.target.value));
    else setInputValue(e.target.value);

    if (setFormState)
      setFormState((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  useEffect(() => {
    if (resetField) {
      setInputValue('');
      if (onBlurUpdate) onBlurUpdate('', name);
    }
  }, [resetField, name, onBlurUpdate]);

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
            'border-solid border-2 rounded-lg p-2 w-full mt-2',
            theme && theme === INPUT_THEME_ERROR
              ? 'border-red-500 text-red-500'
              : 'border-gray-400'
          )}
          onBlur={() => {
            if (onBlurUpdate) onBlurUpdate(inputValue, name);
          }}
        />
      </Label>
      {subContent && (
        <div
          className={cn(
            'mt-1 text-sm',
            theme && theme === INPUT_THEME_ERROR && 'text-red-600'
          )}
        >
          {subContent}
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
  subContent: PropTypes.oneOf([PropTypes.string, PropTypes.element]),
  theme: PropTypes.string,
  resetField: PropTypes.bool,
  valueFormatter: PropTypes.shape({
    format: PropTypes.func,
    unFormat: PropTypes.func
  })
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
  valueFormatter: undefined
};

export default Input;
