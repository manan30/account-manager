import app from 'firebase';

export type IFirebaseContext = {
  firestore: app.firestore.Firestore;
  auth: app.auth.Auth;
  authProviders: { googleAuthProvider: app.auth.GoogleAuthProvider };
  firestoreTimestamp: {
    now: () => app.firestore.Timestamp;
    fromDate: (date: Date) => app.firestore.Timestamp;
  };
};
