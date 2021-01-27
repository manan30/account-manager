import { useCallback, useEffect, useState } from 'react';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { ISpending } from '../../models/Spending';

// TODO: Combine both the creditor hooks
const useGetSpendingData = () => {
  const { firestore } = useFirebaseContext();
  const [data, setData] = useState<ISpending[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchSpendingData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      const spendingDBRef = firestore
        ?.collection('spending')
        .orderBy('updatedAt', 'desc');

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
    fetchSpendingData();
  }, [fetchSpendingData]);

  return { data, error, isLoading };
};

export default useGetSpendingData;
