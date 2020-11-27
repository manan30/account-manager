import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown } from 'react-icons/fa';
import Label from '../Label';

function Select({
  name,
  label,
  placeHolder,
  selectOptions,
  onSelectValueChange
}) {
  const [selectValue, setSelectValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState(selectOptions);

  const handleChange = (e) => {
    setSelectValue(e.target.value);
    if (e.target.value === '') {
      setOptions(selectOptions);
    } else {
      setOptions(
        selectOptions.filter((item) => item.startsWith(e.target.value))
      );
    }
  };

  useEffect(() => {
    if (onSelectValueChange) onSelectValueChange(selectValue);
  }, [selectValue, onSelectValueChange]);

  return (
    <div>
      <Label name={name} label={label}>
        <div className='border-gray-400 border-solid border-2 rounded-lg p-2 w-full mt-2 flex items-center text-base'>
          <input
            id={name}
            name={name}
            value={selectValue}
            placeholder={placeHolder}
            className='mr-4 w-select-width flex-auto'
            onChange={handleChange}
            onFocus={() => setShowOptions(true)}
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
      {showOptions && (
        <ul className='flex flex-col mt-2 pb-2 rounded-lg border-gray-400 border-solid border'>
          {options.map((option, i) => {
            const key = i;
            return (
              <li
                key={key}
                className='hover:bg-indigo-300 px-2 py-1 mt-2 text-gray-800'
              >
                <button
                  type='button'
                  className='w-full text-left'
                  onClick={() => {
                    setSelectValue(option);
                    setShowOptions(false);
                  }}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeHolder: PropTypes.string,
  selectOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectValueChange: PropTypes.func
};

Select.defaultProps = {
  label: '',
  placeHolder: '',
  onSelectValueChange: undefined
};

export default Select;
