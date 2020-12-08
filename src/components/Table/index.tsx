import React, { PropsWithChildren } from 'react';
import { Column, useTable } from 'react-table';

type TableProps<T extends Column, K> = { columns: T[]; data: K[] };

const Table: <T extends Column, K>(
  p: PropsWithChildren<TableProps<T, K>>
) => React.ReactElement = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  console.log({
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  });

  return (
    <table {...getTableProps()} className='w-full rounded-sm'>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                key={column.id}
                className='p-4 text-indigo-600'
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    className='border border-solid border-gray-500 p-4 text-center'
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
