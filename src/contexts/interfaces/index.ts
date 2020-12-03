import app from 'firebase';

export type FirebaseContextType = {
  firebaseApp?: typeof app;
  firestore?: app.firestore.Firestore;
};
