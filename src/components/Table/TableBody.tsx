import React, { PropsWithChildren } from 'react';
import {
  TableBodyPropGetter,
  TableBodyProps as ReactTableBodyProps,
  Row
} from 'react-table';

type TableBodyProps<D extends Record<string, unknown>> = {
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<D>
  ) => ReactTableBodyProps;
  rows: Row<D>[];
  prepareRow: (row: Row<D>) => void;
};

const TableBody: <T extends Record<string, unknown>>(
  p: PropsWithChildren<TableBodyProps<T>>
) => React.ReactElement = ({ getTableBodyProps, rows, prepareRow }) => {
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
                  className='p-3 text-sm'
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
