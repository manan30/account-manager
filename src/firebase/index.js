import { config as env } from 'dotenv';
import app from 'firebase/app';

env();

const prodConfig = {
  apiKey: process.env.PROD_API_KEY,
  authDomain: process.env.PROD_AUTH_DOMAIN,
  databaseURL: process.env.PROD_DATABASE_URL,
  projectId: process.env.PROD_PROJECT_ID,
  storageBucket: process.env.PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.PROD_MESSAGING_SENDER_ID,
  appId: process.env.PROD_APP_ID,
  measurementId: process.env.PROD_MEASUREMENT_ID
};

const devConfig = {
  apiKey: process.env.DEV_API_KEY,
  authDomain: process.env.DEV_AUTH_DOMAIN,
  databaseURL: process.env.DEV_DATABASE_URL,
  projectId: process.env.DEV_PROJECT_ID,
  storageBucket: process.env.DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.DEV_MESSAGING_SENDER_ID,
  appId: process.env.DEV_APP_ID,
  measurementId: process.env.DEV_MEASUREMENT_ID
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;
