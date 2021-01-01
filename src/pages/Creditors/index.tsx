import React, { useEffect, useMemo, useState } from 'react';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { ImSortAmountAsc, ImSortAmountDesc } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CurrencyConversionCell from '../../components/CurrencyConversionCell';
import Loader from '../../components/Loader';
import ModalFallback from '../../components/ModalFallback';
import Table from '../../components/Table';
import useGetAllCreditors from '../../hooks/Creditors/useGetAllCreditors';
import { ICreditor } from '../../models/Creditor';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';
import { ADD_NOTIFICATION } from '../../reducers/NotificationReducer/notificationReducer.interface';
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';
import { NumberWithCommasFormatter } from '../../utils/Formatters';
import { generateRandomKey } from '../../utils/Functions';

const NewCreditorModal = React.lazy(() => import('./NewCreditorModal'));

const Creditors = () => {
  const notificationDispatch = useNotificationDispatchContext();
  const [showModal, setShowModal] = useState(false);
  const [fetchData, setFetchData] = useState(true);
  const { data: creditors, isLoading, error } = useGetAllCreditors(fetchData);

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
        accessor: 'name',
        Cell: ({ row }) => (
          <Link
            className='text-indigo-500 font-medium hover:text-indigo-700'
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
          NumberWithCommasFormatter.format(`${row.original.amount}`)
      },
      {
        Header: 'Account Settled',
        accessor: 'accountSettled',
        Cell: ({ row }) =>
          row.original.accountSettled ? (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800'>
              Settled
            </span>
          ) : (
            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-800'>
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

  const tableData = useMemo(() => creditors, [creditors]);

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
    if (creditors) {
      remaining.push(
        ...creditors.map((creditor) => ({
          name: creditor.name,
          remainingAmount: creditor.remainingAmount,
          currency: creditor.currency
        }))
      );
    }
    return remaining
      .sort((a, b) => b.remainingAmount - a.remainingAmount)
      .slice(0, 3);
  }, [creditors]);

  useEffect(() => {
    if (!isLoading) setFetchData(false);
  }, [isLoading]);

  return (
    <>
      <div className='p-8 bg-gray-100 h-full overflow-y-auto'>
        <div className='w-full mb-8 flex justify-end'>
          <div className='inline-flex ml-auto'>
            <Button
              buttonText='Add New Creditor'
              onClickHandler={() => setShowModal(true)}
            />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 mb-8 lg:grid-cols-3 xl:grid-cols-3'>
          <Card className='p-4 shadow-md bg-gray-100'>
            <div className='flex flex-col'>
              <span className='font-bold text-lg mb-2 text-indigo-600'>
                Total Creditors
              </span>
              <span className='text-gray-700 font-semibold text-4xl tracking-wider'>
                {isLoading ? (
                  <div className='mt-4 h-12 w-12'>
                    <Loader size={36} />
                  </div>
                ) : (
                  creditors?.length
                )}
              </span>
            </div>
          </Card>
          <Card className='p-4 shadow-md bg-gray-100'>
            <div className='flex flex-col'>
              <span className='text-indigo-600 font-bold text-lg mb-2'>
                {`Top ${topRemainingCreditors.length} Remaining Creditors`}
              </span>
              {isLoading ? (
                <div className='mt-4 h-12 w-12'>
                  <Loader size={36} />
                </div>
              ) : (
                <ul className='text-gray-700 mt-2'>
                  {topRemainingCreditors.map((cb) => (
                    <li key={generateRandomKey()} className='mb-2 flex'>
                      <div className='text-sm font-semibold'>{cb.name}</div>
                      <div className='text-sm ml-auto'>
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
        {isLoading && <Loader size={48} />}
        {tableData && (
          <div className='mb-6'>
            <Table columns={tableColumns} data={tableData} paginate />
          </div>
        )}
      </div>
      {showModal && (
        <React.Suspense fallback={<ModalFallback />}>
          <NewCreditorModal
            showModal={showModal}
            setShowModal={setShowModal}
            refetchData={() => setFetchData(true)}
          />
        </React.Suspense>
      )}
    </>
  );
};

export default Creditors;
