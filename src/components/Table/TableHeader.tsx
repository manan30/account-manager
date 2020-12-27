import React from 'react';
import cn from 'classnames';
import { HeaderGroup } from 'react-table';

type TableHeaderProps = {
  headerGroups: HeaderGroup[];
};

const TableHeader: React.FC<TableHeaderProps> = ({ headerGroups }) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()} key='creditors-table-header'>
          {headerGroup.headers.map((column, i) => (
            <th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              key={column.id}
              className={cn(
                'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 sticky top-0 bg-gray-300',
                i === 0 && 'rounded-tl-lg',
                i === headerGroup.headers.length - 1 && 'rounded-tr-lg'
              )}
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
