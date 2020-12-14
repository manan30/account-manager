import { useCallback, useEffect, useState } from 'react';
import { ICreditor } from 'models/Creditor';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { QueryDocumentSnapshot, DocumentData } from '@firebase/firestore-types';

type useGetAllCreditorsParams = {
  limit?: number;
};

const useGetAllCreditors = ({ limit = 10 }: useGetAllCreditorsParams) => {
  const { firestore } = useFirebaseContext();
  const [data, setData] = useState<ICreditor[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalDocs, setTotalDocs] = useState<number | undefined>();
  const [firstDoc, setFirstDoc] = useState<
    QueryDocumentSnapshot<DocumentData> | undefined
  >();
  const [lastDoc, setLastDoc] = useState<
    QueryDocumentSnapshot<DocumentData> | undefined
  >();

  const fetchAllCreditors = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      const creditorDBRef = firestore
        ?.collection('creditors')
        .orderBy('name')
        .limit(limit);

      const queryDocs = await creditorDBRef?.get();
      setFirstDoc(queryDocs?.docs[0]);
      setLastDoc(queryDocs?.docs[queryDocs.docs.length - 1]);
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
      setFirstDoc(undefined);
      setLastDoc(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [firestore, limit]);

  const nextPage = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      const creditorDBRef = firestore
        ?.collection('creditors')
        .orderBy('name')
        .startAfter(lastDoc)
        .limit(limit);

      const queryDocs = await creditorDBRef?.get();
      setFirstDoc(queryDocs?.docs[0]);
      setLastDoc(queryDocs?.docs[queryDocs.docs.length - 1]);
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
      setFirstDoc(undefined);
      setLastDoc(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [firestore, limit, lastDoc]);

  const prevPage = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      const creditorDBRef = firestore
        ?.collection('creditors')
        .orderBy('name')
        .endBefore(firstDoc)
        .limitToLast(limit);

      const queryDocs = await creditorDBRef?.get();
      setFirstDoc(queryDocs?.docs[0]);
      setLastDoc(queryDocs?.docs[queryDocs.docs.length - 1]);
      const creditors = queryDocs?.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        } as ICreditor;
      });
      setData(creditors);
    } catch (err) {
      console.error(err);
      setError(true);
      setFirstDoc(undefined);
      setLastDoc(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [firestore, limit, firstDoc]);

  useEffect(() => {
    fetchAllCreditors();
  }, [fetchAllCreditors]);

  return { data, error, isLoading, nextPage, prevPage };
};

export default useGetAllCreditors;
