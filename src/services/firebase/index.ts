import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { IFirebaseContext } from '../../providers/FirebaseProvider/firebase.interface';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

function FirebaseService(): IFirebaseContext {
  if (!app.apps.length) {
    app.initializeApp(config);
  } else {
    app.app();
  }

  const firestore = app.firestore();
  const auth = app.auth();
  const authProviders = app.auth;

  const googleAuthProvider = new authProviders.GoogleAuthProvider();
  googleAuthProvider.addScope('profile');
  googleAuthProvider.addScope('email');

  if (window.location.hostname === 'localhost') {
    firestore.useEmulator('localhost', 8080);
    auth.useEmulator('http://localhost:9001');
  }

  return {
    firestore,
    auth,
    authProviders: { googleAuthProvider },
    firestoreTimestamp: {
      now: app.firestore.Timestamp.now,
      fromDate: app.firestore.Timestamp.fromDate
    }
  };
}

export default FirebaseService;
