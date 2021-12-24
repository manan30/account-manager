import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { UserCollection } from '../interfaces/user.model';

if (!admin.apps.length) {
  admin.initializeApp();
} else {
  admin.app();
}

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

export const createNewUser = functions.auth.user().onCreate(async (user) => {
  try {
    const userDoc = {
      uid: user.uid,
      disabled: user.disabled,
      emailVerified: user.emailVerified,
      metadata: {
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
        lastRefreshTime: user.metadata.lastRefreshTime
      },
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      tenantId: user.tenantId
    };

    await db.collection(UserCollection).add(userDoc);
    console.log('User added');
  } catch (err) {
    console.error('Error adding new user', err);
  }
});
