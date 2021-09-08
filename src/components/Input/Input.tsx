import React from 'react';
import { InputType } from './interfaces';

type InputProps = {
  name: string;
  label: string;
  value: string;
  type?: InputType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (name: string, value: string) => void;
};

const Input: React.FC<InputProps> = ({
  name,
  value,
  label,
  required = true,
  disabled = false,
  type = 'text',
  onChange
}) => {
  return (
    <label htmlFor={name} className='flex flex-col w-full space-y-2'>
      <span className='text-sm font-semibold tracking-wide text-gray-700'>
        {label}
      </span>
      <input
        name={name}
        id={name}
        value={value}
        type={type}
        autoComplete={type}
        required={required}
        disabled={disabled}
        onChange={(e) => {
          onChange(name, e.target.value);
        }}
        className='w-full px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
      />
    </label>
  );
};

export default Input;
