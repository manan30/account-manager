import app from 'firebase';

export type FirebaseContextType = {
  firebaseApp?: app.app.App;
  firestore?: app.firestore.Firestore;
};
