import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Label from '../Label';
import { INPUT_THEME_ERROR } from '../../utils/Constants/ThemeConstants';

function Input({
  type,
  required,
  name,
  placeHolder,
  label,
  setFormState,
  subContent,
  theme,
  onBlurUpdate
}) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    e.persist();
    setInputValue(e.target.value);
    if (setFormState)
      setFormState((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  return (
    <>
      <Label name={name} label={label}>
        <input
          id={name}
          type={type}
          name={name}
          value={inputValue}
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
  onBlurUpdate: PropTypes.func
};

Input.defaultProps = {
  type: 'text',
  required: true,
  placeHolder: '',
  setFormState: undefined,
  onBlurUpdate: undefined
};

export default Input;
