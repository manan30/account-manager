import { useCallback, useEffect, useState } from 'react';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { ISpending } from '../../models/Spending';

// TODO: Combine both the creditor hooks
const useGetStoreNames = () => {
  const { firestore } = useFirebaseContext();
  const [data, setData] = useState<IStore[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchStoreData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      const storeDBRef = firestore?.collection('stores');

      const queryDocs = await storeDBRef?.get();
      const storeData = queryDocs?.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        } as IStore;
      });
      setData(storeData);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [firestore]);

  useEffect(() => {
    fetchStoreData();
  }, [fetchStoreData]);

  return { data, error, isLoading };
};

export default useGetStoreNames;
