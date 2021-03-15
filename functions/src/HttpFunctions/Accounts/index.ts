import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import axios from 'axios';
import { Agent } from 'https';
import { readFileSync } from 'fs';
import { join } from 'path';
import { TELLER_ENDPOINT } from './constants';
import { EnrollmentBody } from './accounts.interface';
import { AccountsResponse } from 'plaid';

if (!admin.apps.length) admin.initializeApp();
else admin.app();

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

expressApp.post('/teller-account', async (req, res) => {
  try {
    const enrollmentResponse = req.body as EnrollmentBody;

    const { data } = await axios.get<AccountsResponse>('/accounts', {
      auth: {
        username: enrollmentResponse.accessToken,
        password: ''
      }
    });

    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export const accounts = functions.https.onRequest(expressApp);
