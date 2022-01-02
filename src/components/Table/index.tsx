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
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    state: { pageIndex },
    getTableProps,
    getTableBodyProps,
    prepareRow,
    gotoPage,
    nextPage,
    previousPage
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
    <div className='overflow-auto border-b border-gray-200 rounded-md shadow'>
      <div className='overflow-auto max-h-table'>
        <table
          {...getTableProps()}
          className='sticky top-0 min-w-full divide-y divide-gray-200 table-auto'
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
        <div className='flex justify-end w-full p-2'>
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
