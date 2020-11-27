import React from 'react';
import PropTypes from 'prop-types';

function Label({ children, label, name }) {
  return (
    <label htmlFor={name} className='text-indigo-600 font-medium text-lg'>
      {label}
      {children}
    </label>
  );
}

Label.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  children: PropTypes.element.isRequired
};

Label.defaultProps = {
  label: ''
};

export default Label;
