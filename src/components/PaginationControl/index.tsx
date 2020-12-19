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
    <div className='flex items-center text-gray-800'>
      <div className='mr-6 text-sm font-light'>
        {startCount} - {endCount} of {total}
      </div>
      <button
        className={cn('mr-6', startCount === 1 && 'opacity-25 cursor-default')}
      >
        <FaChevronLeft />
      </button>
      <button
        className={cn(
          'mr-6',
          endCount === total && 'opacity-25 cursor-default'
        )}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default PaginationControl;
