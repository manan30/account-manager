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
      className='bg-white divide-y divide-gray-200 h-64 overflow-y-auto'
    >
      {rows.map((row) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()} key={row.id}>
            {row.cells.map((cell) => {
              return (
                <td
                  // TODO: Look into using correct declaration merging for react-table
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  {...cell.getCellProps([{ style: cell.column.style }])}
                  key={cell.column.id}
                  className='px-6 py-4 whitespace-no-wrap text-sm'
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
