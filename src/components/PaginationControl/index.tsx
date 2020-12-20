import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CgPushChevronLeft, CgPushChevronRight } from 'react-icons/cg';
import cn from 'classnames';

type PaginationControlProps = {
  isThereAPreviousPage: boolean;
  previousPage: () => void;
  isThereANextPage: boolean;
  nextPage: () => void;
  start: number;
  end: number;
  gotoPage: (updater: ((pageIndex: number) => number) | number) => void;
  lastPage: number;
};

const PaginationControl: React.FC<PaginationControlProps> = ({
  previousPage,
  isThereAPreviousPage,
  nextPage,
  isThereANextPage,
  start,
  end,
  gotoPage,
  lastPage
}) => {
  return (
    <div className='flex items-center text-gray-800'>
      <div className='mr-6 text-sm font-light'>
        Page {start} of {end}
      </div>
      <button
        className={cn(
          'mr-3',
          !isThereAPreviousPage && 'opacity-25 cursor-default'
        )}
        onClick={() => gotoPage(0)}
        disabled={!isThereAPreviousPage}
      >
        <CgPushChevronLeft size={24} />
      </button>
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
        className={cn('mr-3', !isThereANextPage && 'opacity-25 cursor-default')}
        onClick={nextPage}
        disabled={!isThereANextPage}
      >
        <FaChevronRight />
      </button>
      <button
        className={cn('mr-6', !isThereANextPage && 'opacity-25 cursor-default')}
        onClick={() => gotoPage(lastPage)}
        disabled={!isThereANextPage}
      >
        <CgPushChevronRight size={24} />
      </button>
    </div>
  );
};

export default PaginationControl;
