import app from 'firebase';

export type IFirebaseContext = {
  firebaseApp?: typeof app;
  firestore?: app.firestore.Firestore;
};
