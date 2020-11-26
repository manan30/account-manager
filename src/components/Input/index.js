import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Input({ type, required, name, placeHolder, label, setFormState }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    e.persist();
    setInputValue(e.target.value);
    if (setFormState)
      setFormState((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  return (
    <label htmlFor={name} className='p-2 text-indigo-600'>
      {label}
      <input
        id={name}
        type={type}
        name={name}
        value={inputValue}
        required={required}
        onChange={handleChange}
        placeholder={placeHolder}
        className='border-gray-400 border-solid border-2 rounded-lg p-2 w-full mt-2'
      />
    </label>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  label: PropTypes.string.isRequired,
  setFormState: PropTypes.func
};

Input.defaultProps = {
  type: 'text',
  required: true,
  placeHolder: '',
  setFormState: undefined
};

export default Input;
