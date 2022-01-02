import React from 'react';
import { HeaderGroup } from 'react-table';
import { generateRandomKey } from '../../utils/Functions';

type TableHeaderProps = {
  headerGroups: HeaderGroup[];
};

const TableHeader: React.FC<TableHeaderProps> = ({ headerGroups }) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()} key={generateRandomKey()}>
          {headerGroup.headers.map((column) => (
            <th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              key={column.id}
              className={
                'p-3 md:px-6 md:py-3 text-left text-xxs sm:text-xs font-medium uppercase tracking-wider text-gray-700 sticky top-0 bg-gray-300'
              }
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
