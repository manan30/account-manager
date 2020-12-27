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
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';
import CurrencyConversionCell from '../../components/CurrencyConversionCell';

const CreditorDetails = () => {
  const notificationsDispatch = useNotificationDispatchContext();
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
      <div className='flex mb-8'>
        <Card className='p-4 shadow-md bg-gray-100 mr-6 w-3/5'>
          <div className='flex flex-col'>
            <span className='font-bold text-2xl mb-2 text-indigo-600'>
              Creditor Details
            </span>
            <span className='text-gray-700'>
              {isLoading ? (
                <div className='mt-4 h-12 w-12'>
                  <Loader size={36} />
                </div>
              ) : (
                <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 text-sm font-medium'>
                  <div>
                    <span className='font-bold'>Name:</span> {creditor?.name}
                  </div>
                  <div>
                    <span className='font-bold'>Account Settled: </span>
                    <span className='px-2 inline-flex leading-5 rounded-full'>
                      {creditor?.accountSettled ? (
                        <div className='bg-green-200 text-green-800'>
                          Settled
                        </div>
                      ) : (
                        <div className='bg-red-200 text-red-800'>
                          Not Settled
                        </div>
                      )}
                    </span>
                  </div>
                  {creditor?.accountSettledOn && (
                    <div className='mt-1'>
                      {new Intl.DateTimeFormat('en-US', {
                        weekday: 'short',
                        month: 'short',
                        year: 'numeric',
                        day: 'numeric'
                      }).format(creditor.accountSettledOn.toDate())}
                    </div>
                  )}
                  <div className='mt-1'>
                    <span className='font-bold'>Remaining Amount: </span>
                    {creditor?.remainingAmount}
                  </div>
                  <div className='mt-1'>
                    <span className='font-bold'>Credit Amount: </span>
                    {creditor?.amount}
                  </div>
                  <div className='mt-1'>
                    <span className='font-bold'>Currency: </span>
                    {creditor?.currency}
                  </div>
                  <div className='mt-1 flex'>
                    <span className='font-bold'>Amount in USD: </span>&nbsp;
                    <CurrencyConversionCell
                      amount={creditor?.remainingAmount}
                      currency={creditor?.currency}
                    />
                  </div>
                  <div className='mt-1 text-xs'>
                    <span className='font-bold'>Creditor Added On: </span>
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      year: 'numeric',
                      day: 'numeric'
                    }).format(creditor?.createdAt.toDate())}
                  </div>
                  <div className='mt-1 text-xs'>
                    <span className='font-bold'>Last Updated On: </span>
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      year: 'numeric',
                      day: 'numeric'
                    }).format(creditor?.updatedAt.toDate())}
                  </div>
                </div>
              )}
            </span>
          </div>
        </Card>
        <span className='ml-auto'>
          <Button buttonText='Add Transaction' />
        </span>
      </div>
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
