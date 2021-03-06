import React, { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Helmet } from 'react-helmet';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { ImSortAmountAsc, ImSortAmountDesc } from 'react-icons/im';
import { MdAdd, MdArrowBack, MdDelete, MdEdit } from 'react-icons/md';
import { Column, Row } from 'react-table';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryPie,
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
import usePieChart from '../../hooks/Charts/usePieChart';
import { ISpending } from '../../models/Spending';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';
import { ADD_NOTIFICATION } from '../../reducers/NotificationReducer/notificationReducer.interface';
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';
import { NumberWithCommasFormatter } from '../../utils/Formatters';
import { numberToMonthMapping } from '../../utils/Functions';
import AddSpendingModal from './AddSpendingModal';
import SpendingOverviewModal from './SpendingOverviewModal';
import useFirestoreReadQuery from '../../hooks/Firestore/useFirestoreReadQuery';
import useFirestoreDeleteQuery from '../../hooks/Firestore/useFirestoreDeleteQuery';

const Spending = () => {
  const notificationDispatch = useNotificationDispatchContext();
  const { data: spendingData, isLoading, error } = useFirestoreReadQuery<
    ISpending
  >({
    collection: 'spending',
    orderByClauses: [['date', 'desc']]
  });
  const {
    formattedData: lineChartData,
    isDataFormatted: lineChartDataFormatted
  } = useLineChart(spendingData);
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
    mutation: deleteSpendingEntryMutation
  } = useFirestoreDeleteQuery({
    id: deleteDoc?.id ?? '',
    collectionName: 'spending',
    onComplete: () => {
      setShowDeleteModal(false);
    }
  });
  const [currentSpendingEntry, setCurrentSpendingEntry] = useState<
    ISpending | undefined
  >();
  const [spendingOverviewModalData, setSpendingOverviewModalData] = useState<
    ISpending[] | undefined
  >();
  const [currentMonthYear, setCurrentMonthYear] = useState<
    string | undefined
  >();
  const [showPieChart, setShowPieChart] = useState(false);
  const {
    formattedData: pieChartData,
    isDataFormatted: pieChartDataFormatted,
    angle
  } = usePieChart(spendingData, currentMonthYear, showPieChart);

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

  const verboseMonthYear = useCallback(() => {
    const [month, year] = currentMonthYear?.split('/') ?? [];
    return `Spending for ${new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: '2-digit'
    }).format(new Date(Number(year), Number(month) - 1))}`;
  }, [currentMonthYear]);

  return (
    <>
      <Helmet>
        <title>{`Account Manager - Spending`}</title>
        <meta name='title' content={`Account Manager - Spending`} />
        <meta property='og:title' content={`Account Manager - Spending`} />
        <meta property='twitter:title' content={`Account Manager - Spending`} />
      </Helmet>
      <div className='p-8 bg-gray-100 h-full overflow-y-auto'>
        <div className='mb-6' style={{ height: '40%' }}>
          <Card className='shadow-lg p-6 mb-6'>
            <div
              className={cn(
                'text-xl font-semibold tracking-wider text-indigo-600 h-10',
                showPieChart && 'flex items-center'
              )}
            >
              {showPieChart && (
                <button
                  className='text-indigo-500 mr-4'
                  onClick={() => {
                    setShowPieChart(false);
                    setCurrentMonthYear(undefined);
                  }}
                >
                  <MdArrowBack size={20} />
                </button>
              )}
              <div>
                {showPieChart ? verboseMonthYear() : 'Monthly Spending'}
              </div>
            </div>
            <div
              style={{ height: 'calc(100% - 2.5rem)' }}
              ref={chartContainerRef}
            >
              {showPieChart ? (
                pieChartData && pieChartDataFormatted ? (
                  <VictoryChart theme={VictoryTheme.material} width={width}>
                    <VictoryAxis
                      style={{
                        axis: { stroke: 'none' },
                        ticks: { stroke: 'none' },
                        tickLabels: { fill: 'none' },
                        grid: { stroke: 'none' }
                      }}
                    />
                    <VictoryPie
                      data={pieChartData}
                      style={{
                        data: { fill: ({ datum }) => datum.fill },
                        labels: {
                          fontSize: 16,
                          fontWeight: 'bold',
                          padding: 16
                        }
                      }}
                      labels={({ datum }) =>
                        `${datum.x}: $${NumberWithCommasFormatter.format(
                          datum.y.toFixed(0)
                        )}`
                      }
                      endAngle={angle}
                      padAngle={10}
                      innerRadius={50}
                      animate
                    />
                  </VictoryChart>
                ) : (
                  <div className='grid h-full w-full place-items-center'>
                    <Loader size={48} />
                  </div>
                )
              ) : lineChartData && lineChartDataFormatted ? (
                <VictoryChart
                  theme={VictoryTheme.material}
                  width={width}
                  containerComponent={
                    <VictoryVoronoiContainer
                      voronoiBlacklist={['line']}
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
                          style={{
                            fontSize: 12,
                            fill: '#667eea'
                          }}
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
                    name='line'
                    data={lineChartData}
                    sortKey='x'
                    sortOrder='ascending'
                    interpolation='catmullRom'
                    style={{
                      data: { stroke: '#667eea' }
                    }}
                    animate
                  />
                  <VictoryScatter
                    name='scatter'
                    symbol='circle'
                    style={{ data: { fill: '#2b4ff1', cursor: 'pointer' } }}
                    size={({ active }) => (active ? 6 : 4)}
                    data={lineChartData}
                    events={[
                      {
                        target: 'data',
                        eventHandlers: {
                          onClick: () => {
                            return [
                              {
                                target: 'data',
                                mutation: ({ datum }) => {
                                  setCurrentMonthYear(datum.x);
                                  setShowPieChart(true);
                                }
                              }
                            ];
                          }
                        }
                      }
                    ]}
                    animate
                  />
                </VictoryChart>
              ) : (
                <div className='grid h-full w-full place-items-center'>
                  <Loader size={48} />
                </div>
              )}
            </div>
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
            onConfirmClickHandler={() => deleteSpendingEntryMutation()}
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
