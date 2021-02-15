import { useCallback, useState } from 'react';
import { useFirebaseContext } from '../../providers/FirebaseProvider';

const useDeleteSpendingEntry = (id: string, onComplete?: () => void) => {
  const { firestore } = useFirebaseContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const mutation = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      await firestore.collection('spending').doc(id).delete();
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsLoading(false);
      if (onComplete) onComplete();
    }
  }, [firestore, id, onComplete]);

  return { mutation, error, isLoading };
};

export default useDeleteSpendingEntry;
