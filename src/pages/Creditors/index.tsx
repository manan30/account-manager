import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Column, useTable } from 'react-table';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Table from '../../components/Table';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';
import useGetAllCreditors from '../../hooks/Creditors/useGetAllCreditors';
import { ICreditor } from '../../models/Creditor';
import { ADD_NOTIFICATION } from '../../reducers/NotificationReducer/notificationReducer.interface';
import { NOTIFICATION_THEME_FAILURE } from '../../utils/Constants/ThemeConstants';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';

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
        Header: ({ column }) => (
          <div className='flex' {...column.getHeaderProps()}>
            <div>Name</div>
            <button className='ml-auto'>
              <FaSortAlphaUp />
            </button>
            <button className='ml-auto'>
              <FaSortAlphaDown />
            </button>
          </div>
        ),
        accessor: 'name',
        Cell: ({ row }) => (
          <Link
            className='text-indigo-500 font-medium hover:underline'
            to={`/creditors/${row.original.id}`}
          >
            {row.original.name}
          </Link>
        )
      },
      { Header: 'Remaining Amount', accessor: 'remainingAmount' },
      { Header: 'Currency', accessor: 'currency' },
      { Header: 'Credit Amount', accessor: 'amount' },
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
    <div className='px-12 pt-12 bg-gray-100 h-full'>
      <div className='flex justify-end mb-8'>
        <Link to='/new-creditor'>
          <Button buttonText='Add New Creditor' />
        </Link>
      </div>
      <button onClick={nextPage}>F</button>
      <button onClick={prevPage}>P</button>
      <div>
        {isLoading && <Loader size={48} />}
        {tableData && <Table columns={tableColumns} data={tableData} />}
      </div>
    </div>
  );
}

export default Creditors;
