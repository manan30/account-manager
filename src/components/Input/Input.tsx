import React from 'react';
import cn from 'classnames';
import { InputType } from './interfaces';

type InputProps = {
  name: string;
  label: string;
  value: string;
  type?: InputType;
  placeholder?: string;
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
  disabled = false,
  error = false,
  errorText,
  onChange
}) => {
  return (
    <label htmlFor={name} className='flex flex-col w-full space-y-2'>
      <span className='text-xs font-semibold tracking-wide text-gray-700 sm:text-sm'>
        {label}
      </span>
      <input
        name={name}
        id={name}
        value={value}
        type={type}
        autoComplete={type}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(name, e.target.value);
        }}
        className={cn(
          'w-full text-xs sm:text-sm text-gray-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-shadow hover:shadow-sm',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          disabled && 'opacity-50'
        )}
      />
      {error ? (
        <span className='font-semibold tracking-wide text-red-600 text-xxs sm:text-xs'>
          {errorText ?? 'Required'}
        </span>
      ) : null}
    </label>
  );
};

export default Input;
