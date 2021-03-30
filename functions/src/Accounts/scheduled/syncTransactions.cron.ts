import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';
import { Agent } from 'https';
import { readFileSync } from 'fs';
import { join } from 'path';
import { TELLER_ENDPOINT } from '../utils/constants';
import { Account, AccountCollection } from '../utils/accounts.model';
import { AccountResponse, Transaction } from '../utils/accounts.interface';

if (!admin.apps.length) admin.initializeApp();
else admin.app();

const db = admin.firestore();

const httpsAgent = new Agent({
  cert: readFileSync(
    join(__dirname, '..', '..', '..', 'certs', 'certificate.pem')
  ),
  key: readFileSync(
    join(__dirname, '..', '..', '..', 'certs', 'private_key.pem')
  )
});

axios.defaults.baseURL = TELLER_ENDPOINT;
axios.defaults.withCredentials = true;
axios.defaults.httpsAgent = httpsAgent;

export const syncTransactions = functions.pubsub
  .schedule('every monday 21:00')
  .onRun(async (context) => {
    try {
      const accountsDbRef = db.collection(AccountCollection);
      // const timestamp = admin.firestore.Timestamp.now();

      if (accountsDbRef) {
        const snapshot = await accountsDbRef.get();
        snapshot.forEach(async (doc) => {
          const data = doc.data() as Account;
          const { data: tellerAccounts } = await axios.get<AccountResponse[]>(
            '/accounts',
            {
              auth: { username: data.accessToken, password: '' }
            }
          );
          tellerAccounts.forEach(async (acc) => {
            const { data: accountTransactions } = await axios.get<
              Transaction[]
            >(`/accounts/${acc.id}/transactions?count=10`, {
              auth: { username: data.accessToken, password: '' }
            });
            console.log({ accountTransactions });
          });
        });
      }

      return Promise.resolve();
    } catch (err) {
      console.error({ err });
      return Promise.reject();
    }
  });
