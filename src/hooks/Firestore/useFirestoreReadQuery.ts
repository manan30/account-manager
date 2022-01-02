import { CollectionName } from '../../models/models';
import { useEffect, useRef, useState } from 'react';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { OrderByOptions } from 'firebase';
import { Query, WhereFilterOp } from '@firebase/firestore-types';

const useFirestoreReadQuery = <T>({
  collection,
  id,
  orderByClauses,
  whereClauses
}: {
  collection: CollectionName;
  id?: string;
  orderByClauses?: Array<[keyof T, OrderByOptions]>;
  whereClauses?: Array<[keyof T, WhereFilterOp, unknown]>;
}) => {
  const { firestore } = useFirebaseContext();
  const [data, setData] = useState<Array<T> | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [specificError] = useState<string | undefined>();
  const collectionRef = useRef<Query | undefined>();

  useEffect(() => {
    collectionRef.current = firestore.collection(collection);

    if (whereClauses?.length) {
      whereClauses.forEach(([field, op, value]) => {
        collectionRef.current = collectionRef.current?.where(
          field.toString(),
          op,
          value
        );
      });
    }

    if (orderByClauses?.length) {
      orderByClauses.forEach((clause) => {
        collectionRef.current = collectionRef.current?.orderBy(
          clause[0].toString(),
          clause[1]
        );
      });
    }
  }, [firestore, collection, whereClauses, orderByClauses]);

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
            setData(
              !id ? queryData : queryData.filter((data) => id === data.id)
            );
            setIsLoading(false);
          }
        },
        error: (err) => {
          console.error({ err });
          setError(true);
          setIsLoading(false);
        }
      });
      return unSubscriber;
    }
  }, [firestore, collectionRef, id]);

  return { data, error, isLoading, specificError };
};

export default useFirestoreReadQuery;
