import { CollectionName } from '../../models/models';
import { useCallback, useState } from 'react';
import { useFirebaseContext } from '../../providers/FirebaseProvider';
import { DocumentData, DocumentReference } from '@firebase/firestore-types';

type CreateQueryArgs = {
  collectionName: CollectionName;
  onComplete?: () => void;
};

const useFirestoreCreateQuery = <T>({
  collectionName,
  onComplete
}: CreateQueryArgs) => {
  const { firestore } = useFirebaseContext();
  const [data, setData] = useState<
    DocumentReference<DocumentData> | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  // TODO: Show notification directly from here on error (CRUD)
  const [error, setError] = useState(false);

  const mutation = useCallback(
    async (document: T) => {
      try {
        setIsLoading(true);
        setError(false);
        const createdDoc = await firestore
          .collection(collectionName)
          .add(document);
        setData(createdDoc);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setIsLoading(false);
        if (onComplete) onComplete();
      }
    },
    [firestore, collectionName, onComplete]
  );

  return [mutation, { data, error, isLoading }];
};

export default useFirestoreCreateQuery;
