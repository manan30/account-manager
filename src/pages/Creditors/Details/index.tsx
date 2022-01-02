import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Column } from 'react-table';
import Loader from '../../../components/Loader';
import ModalFallback from '../../../components/ModalFallback';
import Table from '../../../components/Table';
import useFirestoreReadQuery from '../../../hooks/Firestore/useFirestoreReadQuery';
import { RouteParamsInterface } from '../../../interfaces/route-interface';
import { ICreditor } from '../../../models/Creditor';
import { ITransaction } from '../../../models/Transaction';
import { useNotificationDispatch } from '../../../providers/NotificationProvider';
import { NOTIFICATION_THEME_FAILURE } from '../../../utils/Constants/ThemeConstants';
import { CurrencyFormatter } from '../../../utils/Formatters';
import FloatingActionButton from '../../../components/Button/FloatingActionButton';
import { PlusIcon } from '@heroicons/react/solid';
import Date from '../../../components/Date';
import CreditorDetailsCard from '../components/CreditorDetailsCard';

const NewTransactionModal = React.lazy(
  () => import('../components/NewTransactionModal')
);

const CreditorDetails = () => {
  const notificationDispatch = useNotificationDispatch();
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
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
        Header: 'Date',
        accessor: 'transactionDate',
        Cell: ({ row }) => {
          const rawDate = row.original?.transactionDate?.toDate();
          return <Date date={rawDate} />;
        }
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({ row }) => CurrencyFormatter.format(`${row.original.amount}`)
      },
      {
        Header: 'Type',
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
      <CreditorDetailsCard
        creditorDataLoading={creditorDataLoading}
        creditor={creditor}
      />
      {transactionsDataLoading && <Loader size={48} />}
      {tableData && (
        <div className='mb-6'>
          <Table columns={tableColumns} data={tableData} paginate />
        </div>
      )}
      <div className='fixed bottom-0 right-0 mb-16 mr-8 md:mb-8'>
        <FloatingActionButton
          icon={<PlusIcon className='w-6 h-6 text-gray-100' />}
          onClickHandler={() => setShowAddTransactionModal(true)}
        />
      </div>
      {showAddTransactionModal && (
        <React.Suspense fallback={<ModalFallback />}>
          <NewTransactionModal
            transactionEntity={
              creditor ? { name: creditor?.name, id: creditor.id } : undefined
            }
            handleClose={() => setShowAddTransactionModal(false)}
          />
        </React.Suspense>
      )}
    </>
  );
};

export default CreditorDetails;
