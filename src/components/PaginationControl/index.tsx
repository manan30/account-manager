import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import cn from 'classnames';

type PaginationControlProps = {
  startCount: number;
  endCount: number;
  currentPage: number;
  total: number;
};

const PaginationControl: React.FC<PaginationControlProps> = ({
  startCount,
  endCount,
  currentPage,
  total
}) => {
  return (
    <div className='flex items-center mr-4 text-gray-800'>
      <div className='mr-6 text-sm font-light'>
        {startCount} - {endCount} of {total}
      </div>
      <button
        className={cn('mr-6', startCount === 1 && 'text-gray-400 disabled')}
      >
        <FaChevronLeft />
      </button>
      <button
        className={cn('mr-6', endCount === total && 'text-gray-400 disabled')}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default PaginationControl;
