import FirebaseService from '../firebase';

const { firestore } = FirebaseService();

const deleteCollection = async (collectionName: string) => {
  const collectionRef = firestore.collection(collectionName);
  const snapshot = await collectionRef.get();

  if (snapshot.size > 0) {
    const batch = firestore.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }
};

export const deleteEverything = async () => {
  await deleteCollection('creditors');
};

export const seedCreditors = async () => {};
