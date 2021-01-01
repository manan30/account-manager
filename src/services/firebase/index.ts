import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { IFirebaseContext } from '../../providers/FirebaseProvider/firebase.interface';

const config = {
  apiKey: process.env.PROD_API_KEY,
  authDomain: process.env.PROD_AUTH_DOMAIN,
  databaseURL: process.env.PROD_DATABASE_URL,
  projectId: process.env.PROD_PROJECT_ID,
  storageBucket: process.env.PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.PROD_MESSAGING_SENDER_ID,
  appId: process.env.PROD_APP_ID,
  measurementId: process.env.PROD_MEASUREMENT_ID
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

  if (window.location.hostname === 'localhost') {
    firestore.useEmulator('localhost', 8080);
    auth.useEmulator('http://localhost:9001');
  }

  return { firebaseApp: app, firestore, authProviders, auth };
}

export default FirebaseService;
