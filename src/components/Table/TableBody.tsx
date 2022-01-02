import React, { PropsWithChildren } from 'react';
import {
  TableBodyPropGetter,
  TableBodyProps as ReactTableBodyProps,
  Row
} from 'react-table';

type TableBodyProps<D extends Record<string, unknown>> = {
  rows: Row<D>[];
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<D>
  ) => ReactTableBodyProps;
  prepareRow: (row: Row<D>) => void;
};

const TableBody: <T extends Record<string, unknown>>(
  p: PropsWithChildren<TableBodyProps<T>>
) => React.ReactElement = ({ getTableBodyProps, rows, prepareRow }) => {
  return (
    <tbody
      {...getTableBodyProps()}
      className='overflow-y-auto bg-white divide-y divide-gray-200'
    >
      {rows.map((row) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()} key={row.id}>
            {row.cells.map((cell) => {
              return (
                <td
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  {...cell.getCellProps([{ style: cell.column.style }])}
                  key={cell.column.id}
                  className='p-3 whitespace-no-wrap text-xxs sm:text-sm md:px-6 md:py-3'
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
