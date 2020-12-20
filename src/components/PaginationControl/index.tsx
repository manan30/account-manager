import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import cn from 'classnames';

type PaginationControlProps = {
  isThereAPreviousPage: boolean;
  previousPage: () => void;
  isThereANextPage: boolean;
  nextPage: () => void;
  start: number;
  end: number;
};

const PaginationControl: React.FC<PaginationControlProps> = ({
  previousPage,
  isThereAPreviousPage,
  nextPage,
  isThereANextPage,
  start,
  end
}) => {
  return (
    <div className='flex items-center text-gray-800'>
      <div className='mr-6 text-sm font-light'>
        Page {start} of {end}
      </div>
      <button
        className={cn(
          'mr-6',
          !isThereAPreviousPage && 'opacity-25 cursor-default'
        )}
        onClick={previousPage}
        disabled={!isThereAPreviousPage}
      >
        <FaChevronLeft />
      </button>
      <button
        className={cn('mr-6', !isThereANextPage && 'opacity-25 cursor-default')}
        onClick={nextPage}
        disabled={!isThereANextPage}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default PaginationControl;
