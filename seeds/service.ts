import FirebaseService from './firebase';
import { CollectionReference, DocumentData } from '@firebase/firestore-types';

const { firestore } = FirebaseService();

console.log({ firestore });

const batchDeleteQuery = async (query: CollectionReference<DocumentData>) => {
  const snapshot = await query.get();
  const batchSize = snapshot.size;

  if (batchSize === 0) {
    return;
  }

  const batch = firestore.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  process.nextTick(() => {
    batchDeleteQuery(query);
  });
};

const deleteCollection = async (collectionName: string) => {
  console.log(`Deleting ${collectionName}`);
  const collectionRef = firestore.collection(collectionName);
  await batchDeleteQuery(collectionRef);
};

const deleteCreditorCollection = async () => {
  await deleteCollection('creditors');
};

export const deleteAllCollection = async () => {
  await deleteCreditorCollection();
};
