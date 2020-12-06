import React, { useEffect, useState } from 'react';
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

  return <div />;
}

export default Creditors;
