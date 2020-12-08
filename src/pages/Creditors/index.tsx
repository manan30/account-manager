import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Table from '../../components/Table';
import { useFirebaseContext } from '../../contexts/FirebaseContext';
import { ICreditor } from '../../models/Creditor';

function Creditors() {
  const { firestore } = useFirebaseContext();
  const [creditors, setCreditors] = useState<ICreditor[]>([]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await firestore?.collection('creditors').get();
      const data = querySnapshot?.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as ICreditor)
      );
      if (data) setCreditors(data);
    })();
  }, [firestore]);

  const tableColumns = useMemo<Column<Partial<ICreditor>>[]>(
    () => [
      {
        Header: 'Name',
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

  return (
    <div className='px-12 pt-12 bg-gray-100 h-full'>
      <div className='flex justify-end mb-8'>
        <Link to='/new-creditor'>
          <Button buttonText='Add New Creditor' />
        </Link>
      </div>
      <div>
        {tableData.length > 0 ? (
          <Table columns={tableColumns} data={tableData} />
        ) : (
          <Loader size={48} />
        )}
      </div>
    </div>
  );
}

export default Creditors;
