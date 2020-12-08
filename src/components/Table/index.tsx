import React, { PropsWithChildren } from 'react';
import { Column, useTable } from 'react-table';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

export type TableProps<T extends Column, K> = { columns: T[]; data: K[] };

const Table: <T extends Column, K>(
  p: PropsWithChildren<TableProps<T, K>>
) => React.ReactElement = ({ columns, data }) => {
  const { getTableProps } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className='w-full'>
      <TableHeader columns={columns} data={data} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
