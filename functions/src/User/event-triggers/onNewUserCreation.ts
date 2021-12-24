import * as functions from 'firebase-functions';

export const createNewUser = functions.auth.user().onCreate((user) => {
  console.log(JSON.stringify(user, null, 2));
});
