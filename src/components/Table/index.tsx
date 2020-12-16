import React, { PropsWithChildren } from 'react';
import { Column, useSortBy, useTable } from 'react-table';
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
    rows,
    getTableProps,
    getTableBodyProps,
    prepareRow
  } = useTable({ columns, data }, useSortBy);

  return (
    <>
      <table {...getTableProps()} className='w-full'>
        <TableHeader headerGroups={headerGroups} />
        <TableBody
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          prepareRow={prepareRow}
        />
      </table>
      {paginate && (
        <div className='w-full flex justify-end shadow rounded-md p-2 mt-4'>
          <PaginationControl startPage={1} currentPage={1} endPage={10} />
        </div>
      )}
    </>
  );
};

export default Table;
