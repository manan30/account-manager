import React, { useEffect, useMemo } from 'react';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { ImSortAmountAsc, ImSortAmountDesc } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import Table from '../../components/Table';
import useGetAllCreditors from '../../hooks/useGetAllCreditors';
import { ICreditor } from '../../models/Creditor';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';
import { ADD_NOTIFICATION } from '../../reducers/NotificationReducer/notificationReducer.interface';
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';
import { generateRandomKey } from '../../utils/Functions';

function Creditors() {
  const notificationDispatch = useNotificationDispatchContext();
  const { data: creditors, isLoading, error } = useGetAllCreditors();

  const tableColumns = useMemo<Column<Partial<ICreditor>>[]>(
    () => [
      {
        Header: ({ column }) => {
          return (
            <div className='flex items-center'>
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
            to={`/creditors/${row.original.id}`}
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
        accessor: 'remainingAmount'
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
        accessor: 'amount'
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
        Cell: ({ row }) =>
          !row.original.accountSettledOn ? 'N/A' : row.original.accountSettledOn
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

  const currencyBreakdowns = useMemo(() => {
    const breakdown = [];
    const map = new Map<string, number>();
    if (creditors) {
      creditors.forEach((creditor) => {
        const key = creditor.currency;
        const amount = creditor.amount;
        map.set(key, (map.get(key) as number) + amount || amount);
      });
    }
    breakdown.push(...[...map.entries()].sort((a, b) => b[1] - a[1]));
    return breakdown.slice(0, 3);
  }, [creditors]);

  const topRemainingCreditors = useMemo(() => {
    const remaining = [];
    if (creditors) {
      remaining.push(
        ...creditors.map((creditor) => ({
          name: creditor.name,
          remainingAmount: creditor.remainingAmount
        }))
      );
    }
    return remaining
      .sort((a, b) => b.remainingAmount - a.remainingAmount)
      .slice(0, 3);
  }, [creditors]);

  return (
    <div className='p-8 bg-gray-100 h-full overflow-y-auto'>
      <div className='flex justify-end mb-8'>
        <Link to='/new-creditor'>
          <Button buttonText='Add New Creditor' />
        </Link>
      </div>
      <div className='grid grid-cols-3 gap-4 mb-8'>
        <Card className='p-4 bg-indigo-200'>
          <div className='flex flex-col'>
            <span className='text-gray-800 font-medium text-lg mb-2'>
              Total Creditors
            </span>
            <span className='text-gray-800 font-extrabold text-5xl tracking-wider'>
              {creditors?.length}
            </span>
          </div>
        </Card>
        <Card className='p-4 bg-indigo-200'>
          <div className='flex flex-col'>
            <span className='text-gray-800 font-medium text-lg mb-2'>
              {`Top ${currencyBreakdowns.length} Currency Breakdowns`}
            </span>
            <span className='text-gray-800 font-extrabold tracking-wider'>
              <ul>
                {currencyBreakdowns.map((cb) => (
                  <li key={generateRandomKey()}>
                    <div>
                      {cb[0]} - {cb[1]}
                    </div>
                  </li>
                ))}
              </ul>
            </span>
          </div>
        </Card>
        <Card className='p-4 bg-indigo-200'>
          <div className='flex flex-col'>
            <span className='text-gray-800 font-medium text-lg mb-2'>
              {`Top ${topRemainingCreditors.length} Remaining Creditors`}
            </span>
            <span className='text-gray-800 font-bold'>
              <ul>
                {topRemainingCreditors.map((cb) => (
                  <li key={generateRandomKey()}>
                    <div>
                      {cb.name} - {cb.remainingAmount}
                    </div>
                  </li>
                ))}
              </ul>
            </span>
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
  );
}

export default Creditors;
