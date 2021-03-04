import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import {
  Client,
  ClientConfigs,
  CreateLinkTokenOptions,
  environments
} from 'plaid';
import { ACCOUNT } from '../../../models';
import { Account as AccountModel } from '../../../models/Account';
import {
  CreateLinkTokenRequestBody,
  ExchangePublicTokenRequestBody
} from './accounts.interface';

if (!admin.apps.length) admin.initializeApp();
else admin.app();

const db = admin.firestore();

const expressApp = express();
expressApp.use(cors({ origin: true }));

const plaidClientConfig: ClientConfigs = {
  clientID: functions.config().plaid.client_id,
  secret: functions.config().plaid.sandbox_secret,
  env: environments.sandbox,
  options: { version: '2020-09-14' }
};
const plaidClient = new Client(plaidClientConfig);

expressApp.post('/plaid/create-link-token', async (req, res) => {
  console.log(req.body);
  const { userId } = req.body as CreateLinkTokenRequestBody;
  try {
    const createLinkTokenConfig: CreateLinkTokenOptions = {
      client_name: 'Account Manager',
      user: { client_user_id: userId },
      country_codes: ['US'],
      language: 'en',
      products: ['auth', 'transactions']
    };

    const tokenResponse = await plaidClient.createLinkToken(
      createLinkTokenConfig
    );

    return res.status(200).send(tokenResponse);
  } catch (err) {
    console.error({ err });
    return res.status(500).send({ error: err.toString() });
  }
});

expressApp.post('/plaid/set-access-token', async (req, res) => {
  const { publicToken, userId } = req.body as ExchangePublicTokenRequestBody;
  try {
    const tokenResponse = await plaidClient.exchangePublicToken(publicToken);

    const accountsDBRef = db.collection(ACCOUNT);

    if (accountsDBRef) {
      await accountsDBRef.add({
        requestId: tokenResponse.request_id,
        accessToken: tokenResponse.access_token,
        itemId: tokenResponse.item_id,
        userID: userId,
        createdAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now()
      } as AccountModel);
    }

    return res.status(200).send(tokenResponse);
  } catch (err) {
    console.error({ err });
    return res.status(500).send({ error: err.toString() });
  }
});

expressApp.get('/all-accounts', (req, res) => {
  const ACCESS_TOKEN = req.body.accessToken;
  plaidClient.getAccounts(ACCESS_TOKEN, (error: any, accountsResponse: any) => {
    if (error != null) {
      console.error({ error });
      return res.status(500).send({
        error
      });
    }
    return res.status(200).send({ error: null, accounts: accountsResponse });
  });
});

// expressApp.
export const accounts = functions.https.onRequest(expressApp);
