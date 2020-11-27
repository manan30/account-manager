import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';

function Input({
  type,
  required,
  name,
  placeHolder,
  label,
  setFormState,
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
    <Label name={name} label={label}>
      <input
        id={name}
        type={type}
        name={name}
        value={inputValue}
        required={required}
        onChange={handleChange}
        placeholder={placeHolder}
        className='border-gray-400 border-solid border-2 rounded-lg p-2 w-full mt-2'
        onBlur={() => {
          if (onBlurUpdate) onBlurUpdate(inputValue);
        }}
      />
    </Label>
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
