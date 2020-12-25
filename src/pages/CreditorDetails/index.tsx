import React, { useMemo } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Column } from 'react-table';
import Loader from '../../components/Loader';
import Table from '../../components/Table';
import useGetCreditorById from '../../hooks/Creditors/useGetCreditorById';
import { RouteParamsInterface } from '../../interfaces/route-interface';
import { ITransaction } from '../../models/Transaction';
import { NumberWithCommasFormatter } from '../../utils/Formatters';

const CreditorDetails = () => {
  const { id } = useParams<RouteParamsInterface>();
  const {
    creditorData: creditor,
    transactionsData: transactions,
    error,
    isLoading
  } = useGetCreditorById(id);

  const tableColumns = useMemo<Column<Partial<ITransaction>>[]>(
    () => [
      {
        Header: 'Transaction Date',
        accessor: 'transactionDate',
        Cell: ({ row }) => {
          const rawDate = row.original?.transactionDate?.toDate();

          return new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            month: 'short',
            year: 'numeric',
            day: 'numeric'
          }).format(rawDate);
        }
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({ row }) =>
          NumberWithCommasFormatter.format(`${row.original.amount}`)
      },
      {
        Header: 'Transaction Type',
        accessor: 'transactionType',
        Cell: ({ row }) => (
          <span
            className={cn(
              'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
              row.original.transactionType === 'Debit'
                ? 'bg-green-200 text-green-800'
                : 'bg-red-200 text-red-800'
            )}
          >
            {row.original.transactionType}
          </span>
        )
      },
      {
        Header: 'Transaction Added On',
        accessor: 'createdAt',
        Cell: ({ row }) => {
          const rawDate = row.original?.createdAt?.toDate();

          return new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            month: 'short',
            year: 'numeric',
            day: 'numeric'
          }).format(rawDate);
        }
      }
    ],
    []
  );

  const tableData = useMemo(() => transactions, [transactions]);

  return (
    <div className='p-8 bg-gray-100 h-full overflow-y-auto'>
      {isLoading && <Loader size={48} />}
      {tableData && (
        <div className='mb-6'>
          <Table columns={tableColumns} data={tableData} paginate />
        </div>
      )}
    </div>
  );
};

export default CreditorDetails;
