import { useCallback, useEffect, useState } from 'react';
import { ICreditor } from 'models/Creditor';
import { useFirebaseContext } from '../../contexts/FirebaseContext';

const useGetAllCreditors = () => {
  const { firestore } = useFirebaseContext();
  const [data, setData] = useState<ICreditor[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchAllCreditors = useCallback(async () => {
    try {
      setIsLoading(true);
      const querySnapshot = await firestore?.collection('creditors').get();
      const queryData = querySnapshot?.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as ICreditor)
      );
      if (queryData) setData(queryData);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [firestore, setData, setError, setIsLoading]);

  useEffect(() => {
    fetchAllCreditors();
  }, [fetchAllCreditors]);

  return { data, error, isLoading };
};

export default useGetAllCreditors;
