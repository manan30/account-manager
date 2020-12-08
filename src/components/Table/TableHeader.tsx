import React from 'react';
import { HeaderGroup } from 'react-table';

type TableHeaderProps = {
  headerGroups: HeaderGroup[];
};

const TableHeader: React.FC<TableHeaderProps> = ({ headerGroups }) => {
  return (
    <>
      <thead className='shadow rounded-md'>
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
      <tbody>
        <tr>
          <td className='h-4'></td>
        </tr>
      </tbody>
    </>
  );
};

export default TableHeader;
