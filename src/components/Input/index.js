import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Input({ type, required, name, setFormState }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    e.persist();
    setInputValue(e.target.value);
    if (setFormState)
      setFormState((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  return (
    <input
      type={type}
      name={name}
      value={inputValue}
      required={required}
      onChange={handleChange}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  setFormState: PropTypes.func
};

Input.defaultProps = {
  type: 'text',
  required: true,
  setFormState: undefined
};

export default Input;
