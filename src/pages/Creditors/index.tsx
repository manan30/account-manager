import React, { useEffect, useMemo, useState } from 'react';
import { Column } from 'react-table';
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
        accessor: 'name'
      },
      { Header: 'Amount', accessor: 'amount' },
      { Header: 'Currency', accessor: 'currency' },
      { Header: 'Remaining Amount', accessor: 'remainingAmount' },
      { Header: 'Account Settled Date', accessor: 'accountSettledOn' }
    ],
    []
  );

  const tableData = useMemo(() => creditors, [creditors]);

  return (
    <div className='px-12 pt-12 bg-gray-100 h-full'>
      <div>
        <Table columns={tableColumns} data={tableData} />
      </div>
    </div>
  );
}

export default Creditors;
