import React from 'react';

function Label({ children, label, name }) {
  return (
    <label htmlFor={name} className='text-indigo-600 font-medium text-lg'>
      {label}
      {children}
    </label>
  );
}

export default Label;
