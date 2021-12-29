import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowSmUpIcon,
  ArrowSmDownIcon,
  PlusIcon
} from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import Card from '../../components/Card';
import CurrencyConversionCell from '../../components/CurrencyConversionCell';
import Loader from '../../components/Loader';
import ModalFallback from '../../components/ModalFallback';
import Table from '../../components/Table';
import useFirestoreReadQuery from '../../hooks/Firestore/useFirestoreReadQuery';
import { ICreditor } from '../../models/Creditor';
import { useNotificationDispatch } from '../../providers/NotificationProvider';
import { ADD_NOTIFICATION } from '../../reducers/NotificationReducer/notificationReducer.interface';
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';
import { NumberWithCommasFormatter } from '../../utils/Formatters';
import { generateRandomKey } from '../../utils/Functions';
import FloatingActionButton from '../../components/Button/FloatingActionButton';
import { useGlobalState } from '../../providers/GlobalStateProvider';

const NewCreditorModal = React.lazy(
  () => import('./components/NewCreditorModal')
);

const Creditors = () => {
  const notificationDispatch = useNotificationDispatch();
  const { user } = useGlobalState();
  const { data: creditorsData, isLoading, error } = useFirestoreReadQuery<
    ICreditor
  >({
    collection: 'creditor',
    orderByClauses: [['updatedAt', 'desc']],
    whereClauses: [['uid', '==', user?.uid]]
  });

  const [showAddCreditorModal, setShowAddCreditorModal] = useState(false);

  const tableColumns = useMemo<Column<Partial<ICreditor>>[]>(
    () => [
      {
        Header: ({ column }) => {
          return (
            <div className='flex items-center w-4'>
              <div>Name</div>
              <div className='ml-auto'>
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <ArrowSmUpIcon className='h-4 w-4' />
                  ) : (
                    <ArrowSmDownIcon className='h-4 w-4' />
                  )
                ) : (
                  ''
                )}
              </div>
            </div>
          );
        },
        accessor: 'name',
        Cell: ({ row }) => (
          <Link
            className='font-medium text-indigo-500 hover:text-indigo-700'
            to={`/creditor/${row.original.id}`}
          >
            {row.original.name}
          </Link>
        )
      },
      {
        Header: ({ column }) => {
          return (
            <div className='flex items-center'>
              <div>Remaining Amount</div>
              <div className='ml-auto'>
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <ArrowSmUpIcon className='h-4 w-4' />
                  ) : (
                    <ArrowSmDownIcon className='h-4 w-4' />
                  )
                ) : (
                  ''
                )}
              </div>
            </div>
          );
        },
        accessor: 'remainingAmount',
        Cell: ({ row }) =>
          NumberWithCommasFormatter.format(`${row.original.remainingAmount}`)
      },
      { Header: 'Currency', accessor: 'currency', disableSortBy: true },
      {
        Header: ({ column }) => {
          return (
            <div className='flex items-center'>
              <div>Credit Amount</div>
              <div className='ml-auto'>
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <ArrowSmUpIcon className='h-4 w-4' />
                  ) : (
                    <ArrowSmDownIcon className='h-4 w-4' />
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
          NumberWithCommasFormatter.format(`${row.original.amount}`)
      },
      {
        Header: 'Account Settled',
        accessor: 'accountSettled',
        Cell: ({ row }) =>
          row.original.accountSettled ? (
            <span className='inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-200 rounded-full'>
              Settled
            </span>
          ) : (
            <span className='inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-200 rounded-full'>
              Not Settled
            </span>
          ),
        disableSortBy: true
      },
      {
        Header: 'Account Settled Date',
        accessor: 'accountSettledOn',
        Cell: ({ row }) => {
          if (row.original.accountSettledOn) {
            const rawDate = row.original.accountSettledOn.toDate();

            return new Intl.DateTimeFormat('en-US', {
              weekday: 'short',
              month: 'short',
              year: 'numeric',
              day: 'numeric'
            }).format(rawDate);
          }
          return 'N/A';
        }
      },
      {
        Header: 'USD Conversion',
        accessor: 'convertedAmount',
        Cell: ({ row }) => (
          <CurrencyConversionCell
            currency={row.original.currency}
            amount={row.original.remainingAmount}
          />
        ),
        disableSortBy: true
      }
    ],
    []
  );

  const tableData = useMemo(() => creditorsData, [creditorsData]);

  useEffect(() => {
    if (error)
      notificationDispatch({
        type: ADD_NOTIFICATION,
        payload: {
          content:
            'There was an error fetching data, please try again in some time',
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
  }, [error, notificationDispatch]);

  const topRemainingCreditors = useMemo(() => {
    const remaining = [];
    if (creditorsData) {
      remaining.push(
        ...creditorsData.map((creditor) => ({
          name: creditor.name,
          remainingAmount: creditor.remainingAmount,
          currency: creditor.currency
        }))
      );
    }
    return remaining
      .sort((a, b) => b.remainingAmount - a.remainingAmount)
      .slice(0, 3);
  }, [creditorsData]);

  return (
    <>
      <div className='grid grid-cols-2 gap-4 mb-8 lg:grid-cols-3 xl:grid-cols-3'>
        <Card className='p-4 bg-gray-100 shadow-md'>
          <div className='flex flex-col'>
            <span className='mb-2 text-lg font-bold text-indigo-600'>
              Total Creditors
            </span>
            <span className='text-4xl font-semibold tracking-wider text-gray-700'>
              {isLoading ? (
                <div className='w-12 h-12 mt-4'>
                  <Loader size={36} />
                </div>
              ) : (
                creditorsData?.length
              )}
            </span>
          </div>
        </Card>
        <Card className='p-4 bg-gray-100 shadow-md'>
          <div className='flex flex-col'>
            <span className='mb-2 text-lg font-bold text-indigo-600'>
              {`Top ${topRemainingCreditors.length} Remaining Creditors`}
            </span>
            {isLoading ? (
              <div className='w-12 h-12 mt-4'>
                <Loader size={36} />
              </div>
            ) : (
              <ul className='mt-2 text-gray-700'>
                {topRemainingCreditors.map((cb) => (
                  <li key={generateRandomKey()} className='flex mb-2'>
                    <div className='text-sm font-semibold'>{cb.name}</div>
                    <div className='ml-auto text-sm'>
                      {NumberWithCommasFormatter.format(
                        `${cb.remainingAmount}`
                      )}{' '}
                      {cb.currency}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>
      <div className='fixed bottom-0 right-0 mb-8 mr-8'>
        <FloatingActionButton
          icon={<PlusIcon className='w-6 h-6 text-gray-100' />}
          onClickHandler={() => setShowAddCreditorModal(true)}
        />
      </div>
      {isLoading && <Loader size={48} />}
      {tableData && <Table columns={tableColumns} data={tableData} paginate />}
      {showAddCreditorModal && (
        <React.Suspense fallback={<ModalFallback />}>
          <NewCreditorModal
            uid={user?.uid ?? ''}
            handleClose={() => setShowAddCreditorModal(false)}
          />
        </React.Suspense>
      )}
    </>
  );
};

export default Creditors;
