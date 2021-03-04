import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import { Client } from 'plaid';

const expressApp = express();
expressApp.use(cors({ origin: true }));

// expressApp.
export const accounts = functions.https.onRequest(handler);
