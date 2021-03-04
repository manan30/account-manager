import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import {
  Client,
  ClientConfigs,
  CreateLinkTokenOptions,
  environments
} from 'plaid';

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
  try {
    const createLinkTokenConfig: CreateLinkTokenOptions = {
      client_name: 'Account Manager',
      user: { client_user_id: 'test-user-123' },
      country_codes: ['US'],
      language: 'en',
      products: ['auth', 'transactions']
    };

    const tokenResponse = await plaidClient.createLinkToken(
      createLinkTokenConfig
    );

    console.log({ tokenResponse });
    return res.status(200).send(tokenResponse);
  } catch (err) {
    console.error({ err });
    return res.status(500).send({ error: err.toString() });
  }
});

// expressApp.
export const accounts = functions.https.onRequest(expressApp);
