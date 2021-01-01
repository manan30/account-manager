import React, { useEffect, useMemo, useState } from 'react';
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
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';
import ModalFallback from '../../components/ModalFallback';
import NewTransactionModal from '../../components/NewTransactionModal';

const CreditorDetails = () => {
  const notificationsDispatch = useNotificationDispatchContext();
  const [showModal, setShowModal] = useState(false);
  const [fetchData, setFetchData] = useState(true);
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
              ['Debit', 'Account Settled'].includes(
                row.original.transactionType || ''
              )
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

  useEffect(() => {
    if (error) {
      notificationsDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content:
            'An error occurred while fetching data. Please try again later',
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
      console.error(error);
    }
  }, [error, notificationsDispatch]);

  return (
    <>
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
                  <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 text-sm font-normal'>
                    <div className='col-start-1 col-end-3 flex items-center'>
                      <span className='font-bold mr-1'>Name:</span>
                      <span>{creditor?.name}</span>
                    </div>
                    <div className='flex items-center'>
                      <span className='font-bold mr-1'>Account Settled:</span>
                      <span>
                        {creditor?.accountSettled ? (
                          <div className='bg-green-200 text-green-800 rounded-full font-medium inline-flex px-2 text-xs'>
                            Settled
                          </div>
                        ) : (
                          <div className='bg-red-200 text-red-800 rounded-full font-medium inline-flex px-2 text-xs'>
                            Not Settled
                          </div>
                        )}
                      </span>
                    </div>
                    <div className='flex items-center'>
                      <span className='font-bold mr-1'>
                        Account Settled On:
                      </span>
                      <span>
                        {creditor?.accountSettledOn
                          ? new Intl.DateTimeFormat('en-US', {
                              month: 'short',
                              year: 'numeric',
                              day: 'numeric'
                            }).format(creditor.accountSettledOn.toDate())
                          : 'N/A'}
                      </span>
                    </div>
                    <div className='flex items-center'>
                      <span className='font-bold mr-1'>Remaining Amount:</span>
                      <span>{creditor?.remainingAmount}</span>
                    </div>
                    <div className='flex items-center'>
                      <span className='font-bold mr-1'>Credit Amount:</span>
                      <span>{creditor?.amount}</span>
                    </div>
                    <div className='flex items-center'>
                      <span className='font-bold mr-1'>Currency:</span>
                      <span>{creditor?.currency}</span>
                    </div>
                    <div className='flex items-center'>
                      <span className='font-bold mr-1'>Amount in USD:</span>
                      <span>
                        {creditor && (
                          <CurrencyConversionCell
                            amount={creditor?.remainingAmount}
                            currency={creditor?.currency}
                          />
                        )}
                      </span>
                    </div>
                    <div className='text-xs flex items-center'>
                      <span className='font-bold'>Creditor Added On:</span>
                      <span>
                        {new Intl.DateTimeFormat('en-US', {
                          month: 'short',
                          year: 'numeric',
                          day: 'numeric'
                        }).format(creditor?.createdAt.toDate())}
                      </span>
                    </div>
                    <div className='text-xs flex items-center'>
                      <span className='font-bold mr-1'>Last Updated On:</span>
                      <span>
                        {new Intl.DateTimeFormat('en-US', {
                          month: 'short',
                          year: 'numeric',
                          day: 'numeric'
                        }).format(creditor?.updatedAt.toDate())}
                      </span>
                    </div>
                  </div>
                )}
              </span>
            </div>
          </Card>
          <span className='ml-auto'>
            <Button
              buttonText='Add Transaction'
              onClickHandler={() => setShowModal(true)}
            />
          </span>
        </div>
        {isLoading && <Loader size={48} />}
        {tableData && (
          <div className='mb-6'>
            <Table columns={tableColumns} data={tableData} paginate />
          </div>
        )}
      </div>
      {showModal && (
        <React.Suspense fallback={<ModalFallback />}>
          <NewTransactionModal
            showModal={showModal}
            setShowModal={setShowModal}
            refetchData={() => setFetchData(true)}
            transactionEntity={
              creditor ? { name: creditor?.name, id: creditor.id } : undefined
            }
          />
        </React.Suspense>
      )}
    </>
  );
};

export default CreditorDetails;
