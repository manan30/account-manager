import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import { Client, ClientConfigs, environments } from 'plaid';

const expressApp = express();
expressApp.use(cors({ origin: true }));
expressApp.use(express.json());

const plaidClientConfig: ClientConfigs = {
  clientID: functions.config().plaid.client_id,
  secret: functions.config().plaid.sandbox_secret,
  env: environments.sandbox,
  options: { version: '2020-09-14' }
};
const plaidClient = new Client(plaidClientConfig);

// expressApp.
export const accounts = functions.https.onRequest(handler);
