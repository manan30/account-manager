import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import axios from 'axios';
import { Agent } from 'https';
import { readFileSync } from 'fs';
import { join } from 'path';
import { TELLER_ENDPOINT } from '../interfaces/constants';
import {
  AccountResponse,
  EnrollmentData,
  AccountBalance,
  AccountDetails,
  Transaction
} from '../interfaces/accounts.interface';
import { AccountCollection, Account } from '../interfaces/accounts.model';

if (!admin.apps.length) admin.initializeApp();
else admin.app();

const db = admin.firestore();

const expressApp = express();
expressApp.use(cors({ origin: true }));

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

expressApp.post('/add-account', async (req, res) => {
  try {
    const enrollmentData = req.body as EnrollmentData;

    const accountsDbRef = db.collection(AccountCollection);
    const timestamp = admin.firestore.Timestamp.now();

    if (accountsDbRef) {
      const existingAccount = (await accountsDbRef.get()).docs.some(
        (doc) => doc.data().enrollmentId === enrollmentData.enrollment.id
      );
      if (existingAccount)
        return res
          .status(400)
          .send('It looks like this account is already linked');
    }

    const docRef = await accountsDbRef.add({
      userId: enrollmentData.userId,
      tellerUserId: enrollmentData.user.id,
      enrollmentId: enrollmentData.enrollment.id,
      accessToken: enrollmentData.accessToken,
      institutionName: enrollmentData.enrollment.institution.name,
      createdAt: timestamp,
      updatedAt: timestamp
    } as Account);

    return res
      .status(200)
      .send({ success: `Successfully added new account: ${docRef.id}` });
  } catch (err) {
    console.error({ err });
    return res.sendStatus(500);
  }
});

expressApp.get('/:token', async (req, res) => {
  try {
    const { data } = await axios.get<AccountResponse[]>('/accounts', {
      auth: { username: req.params.token, password: '' }
    });
    return res.status(200).send(data);
  } catch (err) {
    console.error({ err });
    return res.sendStatus(500);
  }
});

expressApp.get('/balances/:token/:id', async (req, res) => {
  try {
    const { data } = await axios.get<AccountBalance[]>(
      `/accounts/${req.params.id}/balances`,
      {
        auth: { username: req.params.token, password: '' }
      }
    );
    return res.status(200).send(data);
  } catch (err) {
    console.error({ err });
    return res.sendStatus(500);
  }
});

expressApp.get('/details/:token/:id', async (req, res) => {
  try {
    const { data } = await axios.get<AccountDetails[]>(
      `/accounts/${req.params.id}/details`,
      {
        auth: { username: req.params.token, password: '' }
      }
    );
    return res.status(200).send(data);
  } catch (err) {
    console.error({ err });
    return res.sendStatus(500);
  }
});

expressApp.get('/transactions/:token/:id', async (req, res) => {
  try {
    const count = req.query.count ?? 10;
    const { data } = await axios.get<Transaction[]>(
      `/accounts/${req.params.id}/transactions?count=${count}`,
      {
        auth: { username: req.params.token, password: '' }
      }
    );
    return res.status(200).send(data);
  } catch (err) {
    console.error({ err });
    return res.sendStatus(500);
  }
});

export const accounts = functions.https.onRequest(expressApp);
