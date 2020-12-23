import React, { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import cn from 'classnames';
import Label from '../Label';
import { INPUT_THEME_ERROR } from '../../utils/Constants/ThemeConstants';
import { isEmptyString } from '../../utils/Functions';

export type SelectOption = { label: string; value: string };

type SelectProps = {
  name: string;
  label?: string;
  placeHolder?: string;
  selectOptions: SelectOption[];
  onSelectValueChange?: (name: string, value: SelectOption) => void;
  subContent?: React.ReactNode;
  theme?: string;
  resetField?: boolean;
  resetFormErrors?: (name: string) => void;
};

const Select: React.FC<SelectProps> = ({
  name,
  label = '',
  placeHolder = 'Choose an option',
  selectOptions,
  onSelectValueChange,
  subContent,
  theme = '',
  resetField,
  resetFormErrors
}) => {
  const [selectValue, setSelectValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState(selectOptions);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectValue(e.target.value);
  //   if (e.target.value === '') {
  //     setOptions(selectOptions);
  //   } else {
  //     setOptions(
  //       selectOptions.filter((item) => item.startsWith(e.target.value))
  //     );
  //   }
  // };

  // useEffect(() => {
  //   if (resetFormErrors && !isEmptyString(selectValue)) resetFormErrors(name);
  // }, [selectValue, name, resetFormErrors]);

  // useEffect(() => {
  //   if (resetField) {
  //     setSelectValue('');
  //     // if (onSelectValueChange)
  //     //   onSelectValueChange(name, { label: '', value: '' });
  //   }
  // }, [resetField, name, onSelectValueChange]);

  return (
    <div>
      <Label name={name} label={label}>
        <div
          className={cn(
            'border-solid border-2 rounded-lg p-2 w-full mt-2 flex items-center text-base',
            theme && theme === INPUT_THEME_ERROR
              ? 'border-red-500 text-red-500'
              : 'border-gray-400'
          )}
        >
          <input
            id={name}
            name={name}
            defaultValue={selectValue}
            placeholder={placeHolder}
            className='mr-4 w-select-width flex-auto bg-white focus:outline-none focus:ring focus:border-indigo-300'
            onFocus={() => setShowOptions(true)}
            readOnly
          />
          <button
            className='border-none text-gray-600'
            onClick={() => setShowOptions((prevState) => !prevState)}
            type='button'
          >
            <FaChevronDown />
          </button>
        </div>
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
      {showOptions && (
        <ul className='flex flex-col mt-2 pb-2 rounded-lg border-gray-400 border-solid border overflow-y-auto max-h-select'>
          {options.map((option, i) => {
            const key = i;
            return (
              <li
                key={key}
                className='hover:bg-indigo-300 focus-within:bg-indigo-300 px-2 py-1 mt-2 text-gray-800'
              >
                <button
                  type='button'
                  className='w-full text-left focus:outline-none'
                  onClick={() => {
                    setSelectValue(option.value);
                    setShowOptions(false);
                    if (onSelectValueChange) onSelectValueChange(name, option);
                  }}
                >
                  {option.value}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
