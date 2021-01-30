import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { ImSortAmountAsc, ImSortAmountDesc } from 'react-icons/im';
import { MdAdd } from 'react-icons/md';
import { Column } from 'react-table';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import Badge from '../../components/Badge';
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import ModalFallback from '../../components/ModalFallback';
import Table from '../../components/Table';
import useGetSpendingData from '../../hooks/Spending/useGetSpendingData';
import { ISpending } from '../../models/Spending';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';
import { ADD_NOTIFICATION } from '../../reducers/NotificationReducer/notificationReducer.interface';
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';
import { NumberWithCommasFormatter } from '../../utils/Formatters';
import AddSpendingModal from './AddSpendingModal';

const Spending = () => {
  const notificationDispatch = useNotificationDispatchContext();
  const { data: spendingData, isLoading, error } = useGetSpendingData();
  const [showAddSpendingModal, setShowAddSpendingModal] = useState(false);

  const tableColumns = useMemo<Column<Partial<ISpending>>[]>(
    () => [
      {
        Header: ({ column }) => {
          // TODO: Extract into a sortable header component
          return (
            <div className='flex items-center'>
              <div>Store Name</div>
              <div className='ml-auto'>
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <FaSortAlphaUp />
                  ) : (
                    <FaSortAlphaDown />
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
          <p className='text-indigo-500 font-medium hover:text-indigo-700'>
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
                    <ImSortAmountDesc />
                  ) : (
                    <ImSortAmountAsc />
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
        Header: 'Category',
        accessor: 'category',
        Cell: ({ row }) => (
          <div className='uppercase'>
            <Badge type={row.original.category || ''} />
          </div>
        )
      },
      {
        Header: 'Date',
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
      }
    ],
    []
  );

  const tableData = useMemo(() => spendingData, [spendingData]);

  const generateChartData = useMemo(() => {
    console.log();
  }, [spendingData]);

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
      <Helmet>
        <title>{`Account Manager - Spending`}</title>
        <meta name='title' content={`Account Manager - Spending`} />
        <meta property='og:title' content={`Account Manager - Spending`} />
        <meta property='twitter:title' content={`Account Manager - Spending`} />
      </Helmet>
      <div className='p-8 bg-gray-100 h-full overflow-y-auto'>
        <div className='mb-6 h-64'>
          <Card className='shadow-lg p-6 mb-6'>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine
                style={{
                  data: { stroke: '#c43a31' },
                  parent: { border: '1px solid #ccc' }
                }}
                data={[
                  { x: 1, y: 2 },
                  { x: 2, y: 3 },
                  { x: 3, y: 5 },
                  { x: 4, y: 4 },
                  { x: 5, y: 7 }
                ]}
              />
            </VictoryChart>
          </Card>
        </div>
        {isLoading && <Loader size={48} />}
        {tableData && (
          <div className='mb-6'>
            <Table columns={tableColumns} data={tableData} paginate />
          </div>
        )}
      </div>
      <button
        className='absolute bottom-0 right-0 rounded-full h-12 w-12 p-2 bg-indigo-500 z-10 mr-12 mb-12 shadow-lg hover:bg-indigo-700 text-white grid place-items-center'
        onClick={() => setShowAddSpendingModal(true)}
      >
        <MdAdd size={32} />
      </button>
      {showAddSpendingModal && (
        <React.Suspense fallback={<ModalFallback />}>
          <AddSpendingModal
            handleModalClose={() => setShowAddSpendingModal(false)}
          />
        </React.Suspense>
      )}
    </>
  );
};

export default Spending;
