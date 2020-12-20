import { useCallback, useEffect, useState } from 'react';
import { ICreditor } from 'models/Creditor';
import { useFirebaseContext } from '../providers/FirebaseProvider';

const useGetAllCreditors = () => {
  const { firestore } = useFirebaseContext();
  const [data, setData] = useState<ICreditor[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchAllCreditors = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      const creditorDBRef = firestore?.collection('creditors').orderBy('name');

      const queryDocs = await creditorDBRef?.get();
      const creditors = queryDocs?.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        } as ICreditor;
      });
      setData(creditors);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [firestore]);

  useEffect(() => {
    fetchAllCreditors();
  }, [fetchAllCreditors]);

  return { data, error, isLoading };
};

export default useGetAllCreditors;
