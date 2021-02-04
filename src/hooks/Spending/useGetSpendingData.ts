import { useCallback, useEffect, useState } from 'react';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { ISpending } from '../../models/Spending';

const useGetSpendingData = () => {
  const { firestore } = useFirebaseContext();
  const [data, setData] = useState<ISpending[] | undefined>();
  const [fetchData, setFetchData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchSpendingData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      const spendingDBRef = firestore
        .collection('spending')
        .orderBy('date', 'desc');

      const queryDocs = await spendingDBRef?.get();
      const spendingData = queryDocs?.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        } as ISpending;
      });

      setData(spendingData);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [firestore]);

  useEffect(() => {
    if (fetchData) {
      fetchSpendingData();
    }
  }, [fetchSpendingData, fetchData]);

  useEffect(() => {
    if (!isLoading) setFetchData(false);
  }, [isLoading]);

  return { data, error, isLoading, refreshData: setFetchData };
};

export default useGetSpendingData;
