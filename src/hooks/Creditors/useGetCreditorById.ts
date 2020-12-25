import { useCallback, useEffect, useState } from 'react';
import { ICreditor } from '../../models/Creditor';
import { useFirebaseContext } from '../../providers/FirebaseProvider';

const useGetCreditorById = (id: string) => {
  const { firestore } = useFirebaseContext();
  const [data, setData] = useState<ICreditor | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchCreditorById = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      const creditorDBRef = firestore?.collection('creditor').doc(id);

      const queryDoc = await creditorDBRef?.get();
      if (queryDoc?.exists) {
        const creditor = { id: queryDoc?.id, ...queryDoc.data() } as ICreditor;
        setData(creditor);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [firestore, id]);

  useEffect(() => {
    fetchCreditorById();
  }, [fetchCreditorById, id]);

  return { data, error, isLoading };
};

export default useGetCreditorById;
