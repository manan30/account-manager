import React, { PropsWithChildren } from 'react';
import { Column, useSortBy, useTable } from 'react-table';
import { TableProps } from '.';

const TableHeader: <T extends Column, K>(
  p: PropsWithChildren<TableProps<T, K>>
) => React.ReactElement = ({ columns, data }) => {
  const { headerGroups } = useTable({ columns, data }, useSortBy);

  return (
    <>
      <thead className='shadow rounded-md'>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
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
    </>
  );
};

export default TableHeader;
