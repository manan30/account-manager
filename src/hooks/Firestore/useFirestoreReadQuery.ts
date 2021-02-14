import { CollectionName } from '../../models/models';
import { useEffect, useRef, useState } from 'react';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { OrderByOptions } from 'firebase';
import { DocumentData, Query } from '@firebase/firestore-types';

const useFirestoreReadQuery = <T>({
  collection,
  orderByClauses
}: {
  collection: CollectionName;
  orderByClauses?: Array<[string, OrderByOptions]>;
}) => {
  const { firestore } = useFirebaseContext();
  const [data, setData] = useState<T[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const collectionRef = useRef<Query<DocumentData> | undefined>();

  useEffect(() => {
    collectionRef.current = firestore.collection(collection);
    if (orderByClauses?.length) {
      orderByClauses.forEach((clause) => {
        collectionRef.current = collectionRef.current?.orderBy(
          clause[0],
          clause[1]
        );
      });
    }
  }, [firestore, collection, orderByClauses]);

  useEffect(() => {
    if (collectionRef.current) {
      const unSubscriber = collectionRef.current.onSnapshot({
        next: (snapshot) => {
          if (snapshot.size) {
            setIsLoading(true);
            setError(false);
            const queryData = snapshot?.docs.map((doc) => {
              return {
                id: doc.id,
                ...(doc.data() as T)
              };
            });
            setData(queryData);
            setIsLoading(false);
          }
        },
        error: (err) => {
          console.error(err);
          setError(true);
          setIsLoading(false);
        }
      });
      return unSubscriber;
    }
  }, [firestore, collectionRef]);

  return { data, error, isLoading };
};

export default useFirestoreReadQuery;
