import { CollectionName } from '../../models/models';
import { useEffect, useState } from 'react';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { OrderByOptions } from 'firebase';

const useQueryData = ({
  collection,
  orderByClauses
}: {
  collection: CollectionName;
  orderByClauses: Array<[string, OrderByOptions]>;
}) => {
  const { firestore } = useFirebaseContext();
  const [data, setData] = useState<unknown[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unSubscriber = firestore.collection(collection);

    if (orderByClauses.length) {
      orderByClauses.forEach((clause) => {
        unSubscriber.orderBy(clause[0], clause[1]);
      });
    }

    unSubscriber.onSnapshot({
      next: (snapshot) => {
        setIsLoading(true);
        setError(false);
        const queryData = snapshot?.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });
        setData(queryData);
        setIsLoading(false);
      },
      error: (err) => {
        console.error(err);
        setError(true);
        setIsLoading(false);
      }
    });
    return unSubscriber;
  }, [firestore, collection, orderByClauses]);

  return { data, error, isLoading };
};

export default useQueryData;
