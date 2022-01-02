import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Column } from 'react-table';
import axios, { Response } from 'redaxios';
import RDate from '../../../components/Date';
import Modal from '../../../components/Modal/Modal';
import Table from '../../../components/Table';
import { Transaction } from '../../../models/Account';
import { ACCOUNT_FUNCTIONS } from '../../../utils/Constants/APIConstants';
import { CurrencyFormatter } from '../../../utils/Formatters';
import { generateRandomKey } from '../../../utils/Functions';

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
        Cell: ({ row }) => <RDate date={new Date(row.original.date ?? '')} />
      },
      {
        Header: 'Name',
        accessor: 'details',
        Cell: ({ row }) => {
          const detailsPresent = row.original.details?.counterparty;
          const formattedName =
            typeof row.original.details?.counterparty === 'object'
              ? row.original.details?.counterparty?.name
              : row.original.details?.counterparty;

          return (
            <div className='flex flex-col space-y-1'>
              <div className='font-medium text-gray-700'>
                {detailsPresent
                  ? formattedName
                  : row.original.description?.slice(0, 35)}
              </div>
              {detailsPresent && (
                <div className='font-light text-gray-500'>
                  {row.original.description?.slice(0, 35)}
                </div>
              )}
            </div>
          );
        }
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({ row }) => `$${CurrencyFormatter.format(row.original.amount)}`
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
    <Modal
      size='large'
      title='Transactions'
      onCloseIconClick={onModalCloseHandler}
    >
      {loadingTransactions || !tableData ? (
        new Array(10).fill(0).map(() => (
          <div key={generateRandomKey()} className='w-full p-4 bg-gray-50'>
            <div className='flex space-x-4 animate-pulse'>
              <div className='w-3/4 h-4 bg-gray-200 rounded'></div>
              <div className='w-3/4 h-4 bg-gray-200 rounded'></div>
              <div className='w-3/4 h-4 bg-gray-200 rounded'></div>
              <div className='w-3/4 h-4 bg-gray-200 rounded'></div>
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
    </Modal>
  );
};

export default TransactionsModal;
