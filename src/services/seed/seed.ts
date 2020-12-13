import FirebaseService from '../firebase';

const { firestore } = FirebaseService();

export const seedCreditors = async () => {};

export const seedEverything = async () => {
  await seedCreditors();
};
