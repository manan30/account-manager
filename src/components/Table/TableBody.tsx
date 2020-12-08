import React, { PropsWithChildren } from 'react';
import { Column, useTable } from 'react-table';
import { TableProps } from './index';

const TableBody: <T extends Column, K>(
  p: PropsWithChildren<TableProps<T, K>>
) => React.ReactElement = ({ columns, data }) => {
  const { getTableBodyProps, rows, prepareRow } = useTable({ columns, data });

  return (
    <tbody
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
                  className='text-center p-3'
                >
                  {cell.render('Cell')}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
