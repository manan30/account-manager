import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { ImSortAmountAsc, ImSortAmountDesc } from 'react-icons/im';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { Column, Row } from 'react-table';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer
} from 'victory';
import Badge from '../../components/Badge';
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import DeleteModal from '../../components/Modal';
import ModalFallback from '../../components/ModalFallback';
import Table from '../../components/Table';
import useChartWidth from '../../hooks/Charts/useChartWidth';
import useLineChart from '../../hooks/Charts/useLineChart';
import useStackedChart from '../../hooks/Charts/useStackedChart';
import useDeleteSpendingEntry from '../../hooks/Spending/useDeleteSpendingEntry';
import useGetSpendingData from '../../hooks/Spending/useGetSpendingData';
import { ISpending } from '../../models/Spending';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';
import { ADD_NOTIFICATION } from '../../reducers/NotificationReducer/notificationReducer.interface';
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';
import { NumberWithCommasFormatter } from '../../utils/Formatters';
import { numberToMonthMapping } from '../../utils/Functions';
import AddSpendingModal from './AddSpendingModal';
import SpendingOverviewModal from './SpendingOverviewModal';

const Spending = () => {
  const notificationDispatch = useNotificationDispatchContext();
  const { data: spendingData, isLoading, error } = useGetSpendingData();
  const { formattedData, isDataFormatted } = useLineChart(spendingData);
  const {
    formattedData: stackChartData,
    isDataFormatted: stackChartDataFormatted,
    categories
  } = useStackedChart(spendingData);
  const { chartContainerRef, width } = useChartWidth();
  const [showAddSpendingModal, setShowAddSpendingModal] = useState(false);
  const [showSpendingOverviewModal, setShowSpendingOverviewModal] = useState(
    false
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteDoc, setDeleteDoc] = useState<
    { id: string; name: string } | undefined
  >();
  const {
    error: deleteError,
    isLoading: isDocumentBeingDeleted,
    mutation: deleteMutation
  } = useDeleteSpendingEntry(deleteDoc?.id ?? '', () => {
    setShowDeleteModal(false);
  });
  const [currentSpendingEntry, setCurrentSpendingEntry] = useState<
    ISpending | undefined
  >();
  const [spendingOverviewModalData, setSpendingOverviewModalData] = useState<
    ISpending[] | undefined
  >();

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
          <p className='text-indigo-500 font-medium w-1/3'>
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
        Header: ({ column }) => {
          return (
            <div className='flex items-center'>
              <div>Category</div>
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
        accessor: 'category',
        Cell: ({ row }) => (
          <button
            className='uppercase w-full'
            onClick={() => {
              setShowSpendingOverviewModal(true);
              setCurrentSpendingEntry(row.original as ISpending);
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
        Cell: ({ row }: { row: Row<Partial<ISpending>> }) => (
          <button
            className='text-gray-500 hover:text-gray-700'
            onClick={() => {
              setCurrentSpendingEntry(row.original as ISpending);
              setShowAddSpendingModal(true);
            }}
          >
            <MdEdit size={20} />
          </button>
        ),
        style: { width: '0.1rem', paddingRight: '0' }
      },
      {
        id: 'delete',
        accessor: undefined,
        Cell: ({ row }: { row: Row<Partial<ISpending>> }) => (
          <button
            className='text-red-400 w-4 hover:text-red-600'
            onClick={() => {
              setShowDeleteModal(true);
              setDeleteDoc({
                id: row.original.id ?? '',
                name: row.original.storeName ?? ''
              });
            }}
          >
            <MdDelete size={20} />
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
    if (deleteError)
      notificationDispatch({
        type: ADD_NOTIFICATION,
        payload: {
          content: `There was an error while deleting spending entry for ${deleteDoc?.name}`,
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
  }, [deleteError, notificationDispatch, deleteDoc]);

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
      <Helmet>
        <title>{`Account Manager - Spending`}</title>
        <meta name='title' content={`Account Manager - Spending`} />
        <meta property='og:title' content={`Account Manager - Spending`} />
        <meta property='twitter:title' content={`Account Manager - Spending`} />
      </Helmet>
      <div className='p-8 bg-gray-100 h-full overflow-y-auto'>
        <div className='mb-6' ref={chartContainerRef} style={{ height: '40%' }}>
          <Card className='shadow-lg p-6 mb-6'>
            {isDataFormatted ? (
              <VictoryChart
                theme={VictoryTheme.material}
                width={width}
                containerComponent={
                  <VictoryVoronoiContainer
                    labels={({ datum }) =>
                      `${numberToMonthMapping(datum.x)}: $${datum.y}`
                    }
                    labelComponent={
                      <VictoryTooltip
                        flyoutStyle={{
                          fill: 'white',
                          stroke: '#455a63',
                          strokeWidth: '0.4'
                        }}
                        style={{ fontSize: 12, fill: '#667eea' }}
                        flyoutPadding={8}
                        cornerRadius={4}
                        activateData
                        constrainToVisibleArea
                      />
                    }
                  />
                }
              >
                <VictoryAxis
                  style={{
                    tickLabels: { fontSize: 12 },
                    grid: { stroke: 'none' }
                  }}
                  fixLabelOverlap
                />
                <VictoryAxis
                  style={{
                    tickLabels: { fontSize: 12 },
                    grid: { stroke: 'none' }
                  }}
                  fixLabelOverlap
                  dependentAxis
                />
                <VictoryLine
                  data={formattedData}
                  sortKey='x'
                  sortOrder='ascending'
                  interpolation='catmullRom'
                  style={{
                    data: { stroke: '#667eea' }
                  }}
                  animate
                />
                <VictoryScatter
                  symbol='circle'
                  style={{ data: { fill: '#2b4ff1' } }}
                  data={formattedData}
                  animate
                />
                {/* <VictoryStack
                  colorScale={['tomato', 'orange', 'gold']}
                  horizontal
                >
                  {stackChartData.map((data) => {
                    console.log({ data });
                    return (
                      <VictoryBar key={data.key} data={data.value} animate />
                    );
                  })}
                </VictoryStack> */}
              </VictoryChart>
            ) : (
              <div className='grid h-full w-full place-items-center'>
                <Loader size={48} />
              </div>
            )}
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
            currentTransaction={currentSpendingEntry}
            handleModalClose={() => {
              setShowAddSpendingModal(false);
            }}
          />
        </React.Suspense>
      )}
      {showSpendingOverviewModal && (
        <React.Suspense fallback={<ModalFallback />}>
          <SpendingOverviewModal
            currentTransaction={currentSpendingEntry}
            allTransactions={spendingOverviewModalData}
            handleModalClose={() => {
              setShowSpendingOverviewModal(false);
            }}
          />
        </React.Suspense>
      )}
      {showDeleteModal && (
        <React.Suspense fallback={<ModalFallback />}>
          <DeleteModal
            onCloseClickHandler={() => setShowDeleteModal(false)}
            onConfirmClickHandler={() => deleteMutation()}
            confirmButtonText='Confirm'
            isOpen
            isPerformingAsyncTask={isDocumentBeingDeleted}
          >
            <div className='mb-8 px-2'>
              Are you sure you want to delete <strong>{deleteDoc?.name}</strong>
            </div>
          </DeleteModal>
        </React.Suspense>
      )}
    </>
  );
};

export default Spending;
