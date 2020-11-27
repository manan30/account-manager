import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

function Select() {
  const [selectValue, setSelectValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleChange = (e) => {
    setSelectValue(e.target.value);
  };

  return (
    <div>
      <label htmlFor='transaction-type' className='text-indigo-600'>
        Transaction Type
        <div className='border-gray-400 border-solid border-2 rounded-lg p-2 w-full mt-2 flex items-center'>
          <input
            id='transaction-type'
            name='transaction-type'
            value={selectValue}
            placeholder='Eg. Credit, Debit'
            className='mr-4 w-select-width flex-auto'
            onChange={handleChange}
            onFocus={() => setShowOptions(true)}
            onBlur={() => setShowOptions(false)}
          />
          <button
            className='border-none text-gray-600'
            onClick={() => setShowOptions((prevState) => !prevState)}
            type='button'
          >
            <FaChevronDown />
          </button>
        </div>
      </label>
      {showOptions && (
        <ul className='flex flex-col mt-2 bg-white rounded-lg border-gray-400 border-solid border-2'>
          <l1 className='hover:bg-red-500 px-2 py-1 mt-2'>Item 1</l1>
          <l1 className='hover:bg-red-500 px-2 py-1 mt-2'>Item 2</l1>
          <l1 className='hover:bg-red-500 px-2 py-1 mt-2'>Item 3</l1>
          <l1 className='hover:bg-red-500 px-2 py-1 mt-2'>Item 4</l1>
          <l1 className='hover:bg-red-500 px-2 py-1 mt-2'>Item 5</l1>
        </ul>
      )}
    </div>
  );
}

export default Select;
