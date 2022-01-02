import React from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/outline';
import cn from 'classnames';

type PaginationControlProps = {
  isThereAPreviousPage: boolean;
  isThereANextPage: boolean;
  start: number;
  end: number;
  lastPage: number;
  previousPage: () => void;
  nextPage: () => void;
  gotoPage: (updater: ((pageIndex: number) => number) | number) => void;
};

const PaginationControl: React.FC<PaginationControlProps> = ({
  isThereAPreviousPage,
  isThereANextPage,
  start,
  end,
  lastPage,
  previousPage,
  nextPage,
  gotoPage
}) => {
  return (
    <div className='flex items-center text-gray-800'>
      <button
        className={cn(
          'mr-3',
          !isThereAPreviousPage && 'opacity-25 cursor-default'
        )}
        onClick={() => gotoPage(0)}
        disabled={!isThereAPreviousPage}
      >
        <ChevronDoubleLeftIcon className='w-4 h-4' />
      </button>
      <button
        className={cn(
          'mr-6',
          !isThereAPreviousPage && 'opacity-25 cursor-default'
        )}
        onClick={previousPage}
        disabled={!isThereAPreviousPage}
      >
        <ChevronLeftIcon className='w-4 h-4' />
      </button>
      <div className='mr-6 text-sm font-light'>
        Page {start} of {end}
      </div>
      <button
        className={cn('mr-3', !isThereANextPage && 'opacity-25 cursor-default')}
        onClick={nextPage}
        disabled={!isThereANextPage}
      >
        <ChevronRightIcon className='w-4 h-4' />
      </button>
      <button
        className={cn('mr-6', !isThereANextPage && 'opacity-25 cursor-default')}
        onClick={() => gotoPage(lastPage)}
        disabled={!isThereANextPage}
      >
        <ChevronDoubleRightIcon className='w-4 h-4' />
      </button>
    </div>
  );
};

export default PaginationControl;
