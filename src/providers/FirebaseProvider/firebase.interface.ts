import app from 'firebase';

export type IFirebaseContext = {
  firestore: app.firestore.Firestore;
  auth: app.auth.Auth;
  authProviders: {
    googleAuthProvider: app.auth.GoogleAuthProvider;
    phoneAuthProvider: app.auth.PhoneAuthProvider;
    helpers: {
      credential: typeof app.auth.PhoneAuthProvider.credential;
      reCaptchaVerifier: (
        recaptchaContainer: string
      ) => app.auth.RecaptchaVerifier;
    };
  };
  firestoreTimestamp: {
    now: () => app.firestore.Timestamp;
    fromDate: (date: Date) => app.firestore.Timestamp;
  };
};
