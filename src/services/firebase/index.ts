import dotenv from 'dotenv';
import app from 'firebase/app';
import 'firebase/firestore';

dotenv.config();

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

function FirebaseService() {
  const firebaseApp = app.initializeApp(config);
  const firestore = app.firestore();
  if (window.location.hostname === 'localhost')
    firestore.useEmulator('localhost', 8080);
  return { firebaseApp, firestore };
}

export default FirebaseService;
