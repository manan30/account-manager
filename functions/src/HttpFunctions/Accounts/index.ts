import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import { Client, ClientConfigs } from 'plaid';

const expressApp = express();
expressApp.use(cors({ origin: true }));
expressApp.use(express.json());

const plaidClientConfig: ClientConfigs = {};
const plaidClient = new Client(plaidClientConfig);

// expressApp.
export const accounts = functions.https.onRequest(handler);
