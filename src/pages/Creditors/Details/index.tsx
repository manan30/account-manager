import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Column } from 'react-table';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import CurrencyConversionCell from '../../../components/CurrencyConversionCell';
import Loader from '../../../components/Loader';
import ModalFallback from '../../../components/ModalFallback';
import NewTransactionModal from '../../../components/NewTransactionModal';
import Table from '../../../components/Table';
import useFirestoreReadQuery from '../../../hooks/Firestore/useFirestoreReadQuery';
import { RouteParamsInterface } from '../../../interfaces/route-interface';
import { ICreditor } from '../../../models/Creditor';
import { ITransaction } from '../../../models/Transaction';
import { useNotificationDispatchContext } from '../../../providers/NotificationProvider';
import { NOTIFICATION_THEME_FAILURE } from '../../../utils/Constants/ThemeConstants';
import { NumberWithCommasFormatter } from '../../../utils/Formatters';

const CreditorDetails = () => {
  const notificationDispatch = useNotificationDispatchContext();
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams<RouteParamsInterface>();
  const {
    data: creditorData,
    isLoading: creditorDataLoading,
    error: creditorDataError,
    specificError: creditorNotFound
  } = useFirestoreReadQuery<ICreditor>({
    collection: 'creditor',
    id
  });
  const {
    data: transactionsData,
    isLoading: transactionsDataLoading,
    error: transactionsDataError
  } = useFirestoreReadQuery<ITransaction>({
    collection: 'transaction',
    whereClauses: [['transactionEntity', '==', id]],
    orderByClauses: [['createdAt', 'desc']]
  });

  const creditor = creditorData?.[0];

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

  const tableData = useMemo(() => transactionsData, [transactionsData]);

  useEffect(() => {
    if (creditorNotFound) {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: creditorNotFound,
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
    } else if (creditorDataError) {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: `An error occurred while fetching creditor id: ${id}`,
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
    }
  }, [creditorDataError, creditorNotFound, id, notificationDispatch]);

  useEffect(() => {
    if (transactionsDataError) {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: `An error occurred while fetching transaction for creditor id: ${id}`,
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
    }
  }, [id, transactionsDataError, notificationDispatch]);

  return (
    <>
      <Helmet>
        <title>{`Creditor Details${' - '.concat(creditor?.name ?? '')}`}</title>
        <meta
          name='title'
          content={`Creditor Details${' - '.concat(creditor?.name ?? '')}`}
        />
        <meta
          property='og:title'
          content={`Creditor Details${' - '.concat(creditor?.name ?? '')}`}
        />
        <meta
          property='twitter:title'
          content={`Creditor Details${' - '.concat(creditor?.name ?? '')}`}
        />
      </Helmet>
      <div className='h-full p-8 overflow-y-auto bg-gray-100'>
        <div className='flex mb-8'>
          <Card className='w-3/5 p-4 mr-6 bg-gray-100 shadow-md'>
            <div className='flex flex-col'>
              <span className='mb-2 text-2xl font-bold text-indigo-600'>
                Creditor Details
              </span>
              <span className='text-gray-700'>
                {creditorDataLoading ? (
                  <div className='w-12 h-12 mt-4'>
                    <Loader size={36} />
                  </div>
                ) : (
                  <div className='grid grid-cols-1 gap-3 text-sm font-normal lg:grid-cols-2 xl:grid-cols-2'>
                    <div className='flex items-center col-start-1 col-end-3'>
                      <span className='mr-1 font-bold'>Name:</span>
                      <span>{creditor?.name}</span>
                    </div>
                    <div className='flex items-center'>
                      <span className='mr-1 font-bold'>Account Settled:</span>
                      <span>
                        {creditor?.accountSettled ? (
                          <div className='inline-flex px-2 text-xs font-medium text-green-800 bg-green-200 rounded-full'>
                            Settled
                          </div>
                        ) : (
                          <div className='inline-flex px-2 text-xs font-medium text-red-800 bg-red-200 rounded-full'>
                            Not Settled
                          </div>
                        )}
                      </span>
                    </div>
                    <div className='flex items-center'>
                      <span className='mr-1 font-bold'>
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
                      <span className='mr-1 font-bold'>Remaining Amount:</span>
                      <span>{creditor?.remainingAmount}</span>
                    </div>
                    <div className='flex items-center'>
                      <span className='mr-1 font-bold'>Credit Amount:</span>
                      <span>{creditor?.amount}</span>
                    </div>
                    <div className='flex items-center'>
                      <span className='mr-1 font-bold'>Currency:</span>
                      <span>{creditor?.currency}</span>
                    </div>
                    <div className='flex items-center'>
                      <span className='mr-1 font-bold'>Amount in USD:</span>
                      <span>
                        {creditor && (
                          <CurrencyConversionCell
                            amount={creditor?.remainingAmount}
                            currency={creditor?.currency}
                          />
                        )}
                      </span>
                    </div>
                    <div className='flex items-center text-xs'>
                      <span className='mr-1 font-bold'>Creditor Added On:</span>
                      <span>
                        {new Intl.DateTimeFormat('en-US', {
                          month: 'short',
                          year: 'numeric',
                          day: 'numeric'
                        }).format(creditor?.createdAt.toDate())}
                      </span>
                    </div>
                    <div className='flex items-center text-xs'>
                      <span className='mr-1 font-bold'>Last Updated On:</span>
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
            <Button onClickHandler={() => setShowModal(true)}>
              Add Transaction
            </Button>
          </span>
        </div>
        {transactionsDataLoading && <Loader size={48} />}
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
