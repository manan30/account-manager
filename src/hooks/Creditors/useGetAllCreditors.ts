import { useCallback, useEffect, useState } from 'react';
import { ICreditor } from '../../models/Creditor';
import { useFirebaseContext } from '../../providers/FirebaseProvider';

// TODO: Combine both the creditor hooks
const useGetAllCreditors = (fetch = true) => {
  const { firestore } = useFirebaseContext();
  const [data, setData] = useState<ICreditor[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchAllCreditors = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      const creditorDBRef = firestore
        ?.collection('creditor')
        .orderBy('updatedAt', 'desc');

      const queryDocs = await creditorDBRef?.get();
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
    } finally {
      setIsLoading(false);
    }
  }, [firestore]);

  useEffect(() => {
    if (fetch) {
      fetchAllCreditors();
    }
  }, [fetchAllCreditors, fetch]);

  return { data, error, isLoading };
};

export default useGetAllCreditors;
