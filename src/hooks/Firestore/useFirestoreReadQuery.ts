import { CollectionName } from '../../models/models';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { OrderByOptions } from 'firebase';
import { FieldPath, Query, WhereFilterOp } from '@firebase/firestore-types';

const useFirestoreReadQuery = <T>({
  collection,
  id,
  orderByClauses,
  whereClauses
}: {
  collection: CollectionName;
  id?: string;
  orderByClauses?: Array<[string, OrderByOptions]>;
  whereClauses?: Array<[string | FieldPath, WhereFilterOp, unknown]>;
}) => {
  const { firestore } = useFirebaseContext();
  const [data, setData] = useState<Array<T> | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const collectionRef = useRef<Query | undefined>();

  useEffect(() => {
    collectionRef.current = firestore.collection(collection);

    // if (id) {
    //   collectionRef.current = collectionRef.current.doc(id);
    // }

    if (whereClauses?.length) {
      whereClauses.forEach(([field, op, value]) => {
        collectionRef.current = collectionRef.current?.where(field, op, value);
      });
    }

    if (orderByClauses?.length) {
      orderByClauses.forEach((clause) => {
        collectionRef.current = collectionRef.current?.orderBy(
          clause[0],
          clause[1]
        );
      });
    }
  }, [firestore, collection, id, whereClauses, orderByClauses]);

  const fetchDocById = useCallback(async () => {
    try {
      // setIsLoading(true);
      // setError(false);
      // const doc = await collectionRef.current?.get();
      // if (doc?.size) {
      //   const document = doc?.docs.map(({ id, data }) => ({
      //     id,
      //     ...(data() as T)
      //   }));
      //   setData(document);
      // }
    } catch (err) {
      console.error({ err });
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (collectionRef.current) {
      if (!id) {
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
            console.error({ err });
            setError(true);
            setIsLoading(false);
          }
        });
        return unSubscriber;
      } else {
        fetchDocById();
      }
    }
  }, [firestore, collectionRef, id, fetchDocById]);

  return { data, error, isLoading };
};

export default useFirestoreReadQuery;
