import React, { useEffect, useMemo, useState } from 'react';
import {
  PencilIcon,
  TrashIcon,
  ArrowSmUpIcon,
  ArrowSmDownIcon
} from '@heroicons/react/solid';
import { Column, Row } from 'react-table';
import { PlusIcon } from '@heroicons/react/solid';
import Badge from '../../components/Badge';
import Loader from '../../components/Loader';
import ModalFallback from '../../components/ModalFallback';
import Table from '../../components/Table';
import { IExpense } from '../../models/Expense';
import { useNotificationDispatch } from '../../providers/NotificationProvider';
import { ADD_NOTIFICATION } from '../../reducers/NotificationReducer/notificationReducer.interface';
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';
import { CurrencyFormatter } from '../../utils/Formatters';
import useFirestoreReadQuery from '../../hooks/Firestore/useFirestoreReadQuery';
import FloatingActionButton from '../../components/Button/FloatingActionButton';
import { useGlobalState } from '../../providers/GlobalStateProvider';
import Date from '../../components/Date';

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
  const { data: expenseData, isLoading, error } = useFirestoreReadQuery<
    IExpense
  >({
    collection: 'spending',
    orderByClauses: [['date', 'desc']],
    whereClauses: [['uid', '==', user?.uid]]
  });

  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showExpenseOverviewModal, setShowExpenseOverviewModal] = useState(
    false
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteDoc, setDeleteDoc] = useState<
    { id: string; name: string } | undefined
  >();
  const [currentExpenseEntry, setCurrentExpenseEntry] = useState<
    IExpense | undefined
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
        accessor: 'storeName',
        Cell: ({ row }) => (
          <p className='font-medium text-indigo-500'>
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
        Cell: ({ row }) =>
          `$${CurrencyFormatter.format(`${row.original.amount}`)}`
      },
      {
        Header: ({ column }) => {
          return (
            <div className='flex items-center'>
              <div>Category</div>
              <div className='ml-auto'>
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <ArrowSmDownIcon className='w-4 h-4' />
                  ) : (
                    <ArrowSmUpIcon className='w-4 h-4' />
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
            className='uppercase'
            onClick={() => {
              setShowExpenseOverviewModal(true);
              setCurrentExpenseEntry(row.original as IExpense);
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
                    <ArrowSmDownIcon className='w-4 h-4' />
                  ) : (
                    <ArrowSmUpIcon className='w-4 h-4' />
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
            return <Date date={rawDate} />;
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
              setCurrentExpenseEntry(row.original as IExpense);
              setShowAddExpenseModal(true);
            }}
          >
            <PencilIcon className='w-4 h-4 text-gray-600 md:w-5 md:h-5' />
          </button>
        ),
        style: { paddingRight: '0' }
      },
      {
        id: 'delete',
        accessor: undefined,
        Cell: ({ row }: { row: Row<Partial<IExpense>> }) => (
          <button
            className='text-red-400 hover:text-red-600'
            onClick={() => {
              setShowDeleteModal(true);
              setDeleteDoc({
                id: row.original.id ?? '',
                name: row.original.storeName ?? ''
              });
            }}
          >
            <TrashIcon className='w-4 h-4 text-red-600 md:w-5 md:h-5' />
          </button>
        )
      }
    ],
    []
  );

  const tableData = useMemo(() => expenseData, [expenseData]);

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

  return (
    <>
      {/*TODO: Rethink how to add expense chart */}
      {isLoading && <Loader size={48} />}
      {tableData && (
        <div className='mt-10 md:mt-16'>
          <Table columns={tableColumns} data={tableData} paginate />
        </div>
      )}
      <div className='fixed bottom-0 right-0 mb-16 mr-8 md:mb-8'>
        <FloatingActionButton
          icon={<PlusIcon className='w-6 h-6 text-gray-100' />}
          onClickHandler={() => setShowAddExpenseModal(true)}
        />
      </div>
      {showAddExpenseModal && (
        <React.Suspense fallback={<ModalFallback />}>
          <AddExpenseModal
            uid={user?.uid ?? ''}
            currentTransaction={currentExpenseEntry}
            handleModalClose={() => {
              setShowAddExpenseModal(false);
            }}
          />
        </React.Suspense>
      )}
      {showExpenseOverviewModal && (
        <React.Suspense fallback={<ModalFallback />}>
          <ExpenseOverviewModal
            currentExpense={currentExpenseEntry}
            expenseData={expenseData}
            handleModalClose={() => {
              setShowExpenseOverviewModal(false);
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
