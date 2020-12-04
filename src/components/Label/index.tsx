import React from 'react';

type LabelProps = {
  children: React.ReactNode;
  label?: string;
  name: string;
};

const Label: React.FC<LabelProps> = ({ children, label, name }) => {
  return (
    <label htmlFor={name} className='text-indigo-600 font-medium text-lg'>
      {label}
      {children}
    </label>
  );
};

export default Label;
