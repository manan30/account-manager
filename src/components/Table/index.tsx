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
        {/* <>
          <thead className='shadow rounded-md'>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
                    className='p-3 text-indigo-600 text-left'
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            <tr>
              <td className='h-3'></td>
            </tr>
          </tbody>
        </> */}
        <TableHeader headerGroups={headerGroups} />
        <TableBody
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          prepareRow={prepareRow}
        />
        {/* <tbody
          {...getTableBodyProps()}
          className='border border-opacity-50 border-solid border-gray-400 rounded-md'
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={row.id}
                className='border-b border-opacity-50 border-solid border-gray-400'
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={cell.column.id}
                      className='p-3 text-sm'
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody> */}
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
