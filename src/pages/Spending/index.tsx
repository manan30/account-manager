import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { ImSortAmountAsc, ImSortAmountDesc } from 'react-icons/im';
import { Column } from 'react-table';
import Badge from '../../components/Badge';
import Loader from '../../components/Loader';
import Table from '../../components/Table';
import useGetSpendingData from '../../hooks/Spending/useGetSpendingData';
import { ISpending } from '../../models/Spending';
import { NumberWithCommasFormatter } from '../../utils/Formatters';

const Spending = () => {
  const { data: spendingData, isLoading, error } = useGetSpendingData();

  const tableColumns = useMemo<Column<Partial<ISpending>>[]>(
    () => [
      {
        Header: ({ column }) => {
          // TODO: Extract into a sortable header component
          return (
            <div className='flex items-center'>
              <div>Store Name</div>
              <div className='ml-auto'>
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <FaSortAlphaUp />
                  ) : (
                    <FaSortAlphaDown />
                  )
                ) : (
                  ''
                )}
              </div>
            </div>
          );
        },
        accessor: 'storeName',
        Cell: ({ row }) => (
          <p className='text-indigo-500 font-medium hover:text-indigo-700'>
            {row.original.storeName}
          </p>
        )
      },
      {
        Header: ({ column }) => {
          return (
            <div className='flex items-center'>
              <div>Amount</div>
              <div className='ml-auto'>
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <ImSortAmountDesc />
                  ) : (
                    <ImSortAmountAsc />
                  )
                ) : (
                  ''
                )}
              </div>
            </div>
          );
        },
        accessor: 'amount',
        Cell: ({ row }) =>
          `$${NumberWithCommasFormatter.format(`${row.original.amount}`)}`
      },
      {
        Header: 'Category',
        accessor: 'category',
        Cell: ({ row }) => (
          <div className='uppercase'>
            <Badge type={row.original.category || ''} />
          </div>
        )
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ row }) => {
          if (row.original.date) {
            const rawDate = row.original.date.toDate();

            return new Intl.DateTimeFormat('en-US', {
              weekday: 'short',
              month: 'short',
              year: 'numeric',
              day: 'numeric'
            }).format(rawDate);
          }
          return 'N/A';
        }
      }
    ],
    []
  );

  const tableData = useMemo(() => spendingData, [spendingData]);

  return (
    <>
      <Helmet>
        <title>{`Account Manager - Spending`}</title>
        <meta name='title' content={`Account Manager - Spending`} />
        <meta property='og:title' content={`Account Manager - Spending`} />
        <meta property='twitter:title' content={`Account Manager - Spending`} />
      </Helmet>
      <div className='p-8 bg-gray-100 h-full overflow-y-auto'>
        {isLoading && <Loader size={48} />}
        {tableData && (
          <div className='mb-6'>
            <Table columns={tableColumns} data={tableData} paginate />
          </div>
        )}
      </div>
    </>
  );
};

export default Spending;
