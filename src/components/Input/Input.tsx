import React from 'react';
import cn from 'classnames';
import { InputType } from './interfaces';

type InputProps = {
  name: string;
  label: string;
  value: string;
  type?: InputType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  onChange: (name: string, value: string) => void;
};

const Input: React.FC<InputProps> = ({
  name,
  label,
  value,
  type = 'text',
  placeholder,
  required = true,
  disabled = false,
  error = false,
  errorText,
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
        placeholder={placeholder}
        onChange={(e) => {
          onChange(name, e.target.value);
        }}
        className={cn(
          'w-full text-sm text-gray-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500'
        )}
      />
      {error ? (
        <span className='text-xs font-semibold tracking-wide text-red-600'>
          {errorText ?? 'Required'}
        </span>
      ) : null}
    </label>
  );
};

export default Input;
