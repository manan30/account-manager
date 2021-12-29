import React, { useEffect, useMemo, useState } from 'react';
import {
  PencilIcon,
  TrashIcon,
  ArrowSmUpIcon,
  ArrowSmDownIcon
} from '@heroicons/react/solid';
import { Column, Row } from 'react-table';
import Badge from '../../components/Badge';
import Loader from '../../components/Loader';
import ModalFallback from '../../components/ModalFallback';
import Table from '../../components/Table';
import { IExpense } from '../../models/Expense';
import { useNotificationDispatch } from '../../providers/NotificationProvider';
import { ADD_NOTIFICATION } from '../../reducers/NotificationReducer/notificationReducer.interface';
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';
import { NumberWithCommasFormatter } from '../../utils/Formatters';
import useFirestoreReadQuery from '../../hooks/Firestore/useFirestoreReadQuery';
import FloatingActionButton from '../../components/Button/FloatingActionButton';
import { PlusIcon } from '@heroicons/react/solid';
import { useGlobalState } from '../../providers/GlobalStateProvider';

const DeleteExpenseModal = React.lazy(
  () => import('./components/DeleteExpenseModal')
);
const ExpenseOverviewModal = React.lazy(
  () => import('./components/ExpenseOverviewModal')
);
const AddExpenseModal = React.lazy(
  () => import('./components/AddExpenseModal')
);

const Spending = () => {
  const notificationDispatch = useNotificationDispatch();
  const { user } = useGlobalState();
  const { data: spendingData, isLoading, error } = useFirestoreReadQuery<
    IExpense
  >({
    collection: 'spending',
    orderByClauses: [['date', 'desc']],
    whereClauses: [['uid', '==', user?.uid]]
  });
  const [showAddSpendingModal, setShowAddSpendingModal] = useState(false);
  const [showSpendingOverviewModal, setShowSpendingOverviewModal] = useState(
    false
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteDoc, setDeleteDoc] = useState<
    { id: string; name: string } | undefined
  >();

  const [currentSpendingEntry, setCurrentSpendingEntry] = useState<
    IExpense | undefined
  >();
  const [spendingOverviewModalData, setSpendingOverviewModalData] = useState<
    IExpense[] | undefined
  >();

  const tableColumns = useMemo<Column<Partial<IExpense>>[]>(
    () => [
      {
        Header: ({ column }) => {
          return (
            <div className='flex items-center'>
              <div>Store Name</div>
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
        accessor: 'storeName',
        Cell: ({ row }) => (
          <p className='w-1/3 font-medium text-indigo-500'>
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
          `$${NumberWithCommasFormatter.format(`${row.original.amount}`)}`
      },
      {
        Header: ({ column }) => {
          return (
            <div className='flex items-center'>
              <div>Category</div>
              <div className='ml-auto'>
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <ArrowSmDownIcon className='h-4 w-4' />
                  ) : (
                    <ArrowSmUpIcon className='h-4 w-4' />
                  )
                ) : (
                  ''
                )}
              </div>
            </div>
          );
        },
        accessor: 'category',
        Cell: ({ row }) => (
          <button
            className='w-full uppercase'
            onClick={() => {
              setShowSpendingOverviewModal(true);
              setCurrentSpendingEntry(row.original as IExpense);
            }}
          >
            <Badge type={row.original.category || ''} />
          </button>
        )
      },
      {
        Header: ({ column }) => {
          return (
            <div className='flex items-center'>
              <div>Date</div>
              <div className='ml-auto'>
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <ArrowSmDownIcon className='h-4 w-4' />
                  ) : (
                    <ArrowSmUpIcon className='h-4 w-4' />
                  )
                ) : (
                  ''
                )}
              </div>
            </div>
          );
        },
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
      },
      {
        id: 'edit',
        accessor: undefined,
        Cell: ({ row }: { row: Row<Partial<IExpense>> }) => (
          <button
            className='text-gray-500 hover:text-gray-700'
            onClick={() => {
              setCurrentSpendingEntry(row.original as IExpense);
              setShowAddSpendingModal(true);
            }}
          >
            <PencilIcon className='h-5 w-5 text-gray-600' />
          </button>
        ),
        style: { width: '0.1rem', paddingRight: '0' }
      },
      {
        id: 'delete',
        accessor: undefined,
        Cell: ({ row }: { row: Row<Partial<IExpense>> }) => (
          <button
            className='w-4 text-red-400 hover:text-red-600'
            onClick={() => {
              setShowDeleteModal(true);
              setDeleteDoc({
                id: row.original.id ?? '',
                name: row.original.storeName ?? ''
              });
            }}
          >
            <TrashIcon className='h-5 w-5 text-red-600' />
          </button>
        ),
        style: { width: '0.1rem' }
      }
    ],
    []
  );

  const tableData = useMemo(() => spendingData, [spendingData]);

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

  useEffect(() => {
    if (showSpendingOverviewModal)
      setSpendingOverviewModalData(
        spendingData
          ?.filter(
            (d) =>
              d.category === currentSpendingEntry?.category &&
              d.id !== currentSpendingEntry.id
          )
          .sort((a, b) => {
            return (
              new Date(b.date.toDate()).valueOf() -
              new Date(a.date.toDate()).valueOf()
            );
          })
      );
  }, [showSpendingOverviewModal, spendingData, currentSpendingEntry]);

  return (
    <>
      {/*TODO: Rethink how to add expense chart */}
      {isLoading && <Loader size={48} />}
      {tableData && <Table columns={tableColumns} data={tableData} paginate />}
      <div className='fixed bottom-0 right-0 mb-8 mr-8'>
        <FloatingActionButton
          icon={<PlusIcon className='w-6 h-6 text-gray-100' />}
          onClickHandler={() => setShowAddSpendingModal(true)}
        />
      </div>
      {showAddSpendingModal && (
        <React.Suspense fallback={<ModalFallback />}>
          <AddExpenseModal
            uid={user?.uid ?? ''}
            currentTransaction={currentSpendingEntry}
            handleModalClose={() => {
              setShowAddSpendingModal(false);
            }}
          />
        </React.Suspense>
      )}
      {showSpendingOverviewModal && (
        <React.Suspense fallback={<ModalFallback />}>
          <ExpenseOverviewModal
            currentExpense={currentSpendingEntry}
            allExpenses={spendingOverviewModalData}
            handleModalClose={() => {
              setShowSpendingOverviewModal(false);
            }}
          />
        </React.Suspense>
      )}
      {showDeleteModal && (
        <React.Suspense fallback={<ModalFallback />}>
          <DeleteExpenseModal
            deleteDoc={deleteDoc}
            handleClose={() => setShowDeleteModal(false)}
          />
        </React.Suspense>
      )}
    </>
  );
};

export default Spending;
