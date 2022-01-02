import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowSmUpIcon,
  ArrowSmDownIcon,
  PlusIcon
} from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import ModalFallback from '../../components/ModalFallback';
import Table from '../../components/Table';
import useFirestoreReadQuery from '../../hooks/Firestore/useFirestoreReadQuery';
import { ICreditor } from '../../models/Creditor';
import { useNotificationDispatch } from '../../providers/NotificationProvider';
import { ADD_NOTIFICATION } from '../../reducers/NotificationReducer/notificationReducer.interface';
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';
import { CurrencyFormatter } from '../../utils/Formatters';
import { generateRandomKey } from '../../utils/Functions';
import FloatingActionButton from '../../components/Button/FloatingActionButton';
import { useGlobalState } from '../../providers/GlobalStateProvider';
import Date from '../../components/Date';
import SettlementBadge from './components/SettlementBadge';

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
                    <ArrowSmUpIcon className='w-4 h-4' />
                  ) : (
                    <ArrowSmDownIcon className='w-4 h-4' />
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
                    <ArrowSmUpIcon className='w-4 h-4' />
                  ) : (
                    <ArrowSmDownIcon className='w-4 h-4' />
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
          CurrencyFormatter.format(`${row.original.remainingAmount}`)
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
                    <ArrowSmUpIcon className='w-4 h-4' />
                  ) : (
                    <ArrowSmDownIcon className='w-4 h-4' />
                  )
                ) : (
                  ''
                )}
              </div>
            </div>
          );
        },
        accessor: 'amount',
        Cell: ({ row }) => CurrencyFormatter.format(`${row.original.amount}`)
      },
      {
        Header: 'Account Settled',
        accessor: 'accountSettled',
        Cell: ({ row }) => (
          <SettlementBadge settled={row.original.accountSettled} />
        ),
        disableSortBy: true
      },
      {
        Header: 'Account Settled Date',
        accessor: 'accountSettledOn',
        Cell: ({ row }) => {
          if (row.original.accountSettledOn) {
            const rawDate = row.original.accountSettledOn.toDate();

            return <Date date={rawDate} />;
          }
          return 'N/A';
        }
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
      <div className='grid grid-cols-1 gap-4 mt-10 mb-8 md:mt-16 md:grid-cols-2 lg:grid-cols-3'>
        <Card className='shadow-md'>
          <div className='flex flex-col space-y-4'>
            <span className='text-base font-bold text-indigo-600 md:text-lg'>
              {`Top ${topRemainingCreditors.length} Remaining Creditors`}
            </span>
            {isLoading ? (
              <div className='w-12 h-12 mt-4'>
                <Loader size={36} />
              </div>
            ) : (
              <ul className='text-xs text-gray-700 md:text-sm'>
                {topRemainingCreditors.map((cb) => (
                  <li key={generateRandomKey()} className='flex mb-2'>
                    <div className='font-semibold'>{cb.name}</div>
                    <div className='ml-auto'>
                      {CurrencyFormatter.format(`${cb.remainingAmount}`)}{' '}
                      {cb.currency}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>
      {isLoading && <Loader size={48} />}
      {tableData && <Table columns={tableColumns} data={tableData} paginate />}
      <div className='fixed bottom-0 right-0 mb-16 mr-8 md:mb-8'>
        <FloatingActionButton
          icon={<PlusIcon className='w-6 h-6 text-gray-100' />}
          onClickHandler={() => setShowAddCreditorModal(true)}
        />
      </div>
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
