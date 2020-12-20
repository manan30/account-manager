import React from 'react';
import { HeaderGroup } from 'react-table';

type TableHeaderProps = {
  headerGroups: HeaderGroup[];
};

const TableHeader: React.FC<TableHeaderProps> = ({ headerGroups }) => {
  return (
    <thead className=''>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()} key='creditors-table-header'>
          {headerGroup.headers.map((column) => (
            <th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              key={column.id}
              className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 sticky top-0 bg-gray-300'
            >
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
