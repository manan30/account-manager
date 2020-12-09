import Button from 'components/Button';
import React from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

type PaginationControlProps = {
  startPage: number;
  endPage: number;
  currentPage: number;
};

const PaginationControl: React.FC<PaginationControlProps> = ({
  startPage,
  endPage,
  currentPage
}) => {
  return (
    <div className='flex items-center mr-4'>
      {currentPage !== 1 && (
        <button>
          <FaChevronCircleLeft />
        </button>
      )}
      <div className='mr-2'>{startPage}</div>
      <div className='mr-2'>of</div>
      <div className='mr-2'>{endPage}</div>
      {currentPage !== endPage && (
        <button>
          <FaChevronCircleRight />
        </button>
      )}
    </div>
  );
};

export default PaginationControl;
