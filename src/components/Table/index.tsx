import React, { PropsWithChildren } from 'react';
import { Column, usePagination, useSortBy, useTable } from 'react-table';
import PaginationControl from '../PaginationControl';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

export type TableProps<T extends Column, K> = {
  columns: T[];
  data: K[];
  paginate?: boolean;
};

const Table: <T extends Column, K>(
  p: PropsWithChildren<TableProps<T, K>>
) => React.ReactElement = ({ columns, data, paginate = true }) => {
  const {
    headerGroups,
    page,
    getTableProps,
    getTableBodyProps,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    useSortBy,
    usePagination
  );

  return (
    <div className='shadow border-b border-gray-200 rounded-lg overflow-auto'>
      <div className='overflow-auto max-h-table'>
        <table
          {...getTableProps()}
          className='min-w-full divide-y divide-gray-200 sticky top-0'
        >
          <TableHeader headerGroups={headerGroups} />
          <TableBody
            getTableBodyProps={getTableBodyProps}
            rows={page}
            prepareRow={prepareRow}
          />
        </table>
      </div>
      {paginate && (
        <div className='w-full flex justify-end p-2'>
          <PaginationControl
            previousPage={previousPage}
            isThereAPreviousPage={canPreviousPage}
            nextPage={nextPage}
            isThereANextPage={canNextPage}
            start={pageIndex + 1}
            end={pageOptions.length}
            gotoPage={gotoPage}
            lastPage={pageCount - 1}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
