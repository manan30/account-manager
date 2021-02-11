import { useCallback, useEffect, useState } from 'react';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { ISpendingCategory } from 'models/SpendingCategory';

const useGetSpendingCategoryNames = () => {
  const { firestore } = useFirebaseContext();
  const [data, setData] = useState<ISpendingCategory[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchSpendingCategoryData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      const spendingCategoryDBRef = firestore?.collection(
        'spending-categories'
      );

      const queryDocs = await spendingCategoryDBRef?.get();
      const spendingCategoryData = queryDocs?.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        } as ISpendingCategory;
      });
      setData(spendingCategoryData);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [firestore]);

  useEffect(() => {
    fetchSpendingCategoryData();
  }, [fetchSpendingCategoryData]);

  return { data, error, isLoading };
};

export default useGetSpendingCategoryNames;
