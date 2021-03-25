import React, { useMemo } from 'react';
import cn from 'classnames';
import { MdClose } from 'react-icons/md';
import { useQuery } from 'react-query';
import { Column, Row } from 'react-table';
import axios, { Response } from 'redaxios';
import Table from '../../components/Table';
import { Transaction } from '../../models/Account';
import { ACCOUNT_FUNCTIONS } from '../../utils/Constants/APIConstants';
import { NumberWithCommasFormatter } from '../../utils/Formatters';
import { generateRandomKey } from '../../utils/Functions';

type TransactionModalProps = {
  accessToken: string;
  accountId: string;
  onModalCloseHandler: () => void;
};

const TransactionsModal: React.FC<TransactionModalProps> = ({
  accessToken,
  accountId,
  onModalCloseHandler
}) => {
  const { data: transactionsData, isLoading: loadingTransactions } = useQuery<
    Response<Transaction[]>,
    Response<Error>
  >(
    [accountId, accessToken, 'transactions'],
    async () =>
      await axios.get<Transaction[]>(
        `${ACCOUNT_FUNCTIONS}/transactions/${accessToken}/${accountId}`
      ),
    { staleTime: 600000 }
  );

  const tableColumns = useMemo<Column<Partial<Transaction>>[]>(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ row }) => (
          <p className=''>
            {new Intl.DateTimeFormat('en-US', {
              weekday: 'short',
              month: 'short',
              year: 'numeric',
              day: 'numeric'
            }).format(new Date(row.original.date ?? ''))}
          </p>
        )
      },
      {
        Header: 'Name',
        accessor: 'description',
        Cell: ({ row }) => row.original.description?.slice(0, 35)
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({ row }) =>
          `$ ${NumberWithCommasFormatter.format(row.original.amount)}`
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row }) => <p className='capitalize'>{row.original.status}</p>
      }
    ],
    []
  );

  const tableData = useMemo(() => transactionsData?.data, [
    transactionsData?.data
  ]);

  return (
    <div className='fixed z-10 inset-0 overflow-y-auto grid place-items-center'>
      <div
        className='fixed inset-0 bg-gray-500 opacity-50'
        aria-hidden='true'
      />
      <div
        className='w-2/3 py-8 px-12 rounded-md shadow-xl bg-gray-50 z-40'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-headline'
      >
        <div className='flex items-center'>
          <div className='text-indigo-600 text-xl font-bold tracking-wide'>
            Transactions
          </div>
          <button
            className='ml-auto p-1 rounded-full hover:bg-gray-200'
            onClick={onModalCloseHandler}
          >
            <MdClose className='text-gray-500' size={20} />
          </button>
        </div>
        <div className='mt-6'>
          {loadingTransactions || !tableData ? (
            new Array(10).fill(0).map(() => (
              <div key={generateRandomKey()} className='p-4 w-full bg-gray-50'>
                <div className='animate-pulse flex space-x-4'>
                  <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                  <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                  <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                  <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                </div>
              </div>
            ))
          ) : (
            <>
              <p className='mb-4 font-semibold text-gray-700'>
                Showing last {tableData.length} transactions
              </p>
              <Table columns={tableColumns} data={tableData} paginate={false} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsModal;
