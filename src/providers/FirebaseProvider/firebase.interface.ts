import app from 'firebase';

export type IFirebaseContext = {
  firebaseApp?: typeof app;
  firestore?: app.firestore.Firestore;
  auth?: app.auth.Auth;
  authProviders?: { googleAuthProvider: app.auth.GoogleAuthProvider };
};
