import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Table from '../../components/Table';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';
import useGetAllCreditors from '../../hooks/Creditors/useGetAllCreditors';
import { ICreditor } from '../../models/Creditor';
import { ADD_NOTIFICATION } from '../../reducers/NotificationReducer/notificationReducer.interface';
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';

import { ImSortAmountAsc, ImSortAmountDesc } from 'react-icons/im';
import PaginationControl from '../../components/PaginationControl';

function Creditors() {
  const notificationDispatch = useNotificationDispatchContext();
  const {
    data: creditors,
    isLoading,
    error,
    nextPage,
    prevPage
  } = useGetAllCreditors({
    limit: 10
  });

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

  return (
    <div className='p-8 bg-gray-100 h-full overflow-y-auto'>
      <div className='flex justify-end mb-8'>
        <Link to='/new-creditor'>
          <Button buttonText='Add New Creditor' />
        </Link>
      </div>
      {isLoading && <Loader size={48} />}
      {tableData && (
        <div className='mb-6'>
          <Table columns={tableColumns} data={tableData} paginate />
          {/* <div className='w-full flex justify-end p-2 shadow rounded-b-lg'>
            <PaginationControl startPage={1} currentPage={1} endPage={10} />
          </div> */}
        </div>
      )}
    </div>
  );
}

export default Creditors;
