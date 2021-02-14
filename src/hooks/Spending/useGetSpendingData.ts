import { useEffect, useState } from 'react';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { ISpending } from '../../models/Spending';
import { CollectionName } from '../../models/models';

const useGetSpendingData = () => {
  const { firestore } = useFirebaseContext();
  const [data, setData] = useState<ISpending[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unSubscriber = firestore
      .collection('spending')
      .orderBy('date', 'desc')
      .onSnapshot({
        next: (snapshot) => {
          setIsLoading(true);
          setError(false);
          const spendingData = snapshot?.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            } as ISpending;
          });
          setData(spendingData);
          setIsLoading(false);
        },
        error: (err) => {
          console.error(err);
          setError(true);
          setIsLoading(false);
        }
      });
    return unSubscriber;
  }, [firestore]);

  return { data, error, isLoading };
};

export default useGetSpendingData;
