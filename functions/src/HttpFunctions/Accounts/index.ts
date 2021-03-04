import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import {
  Client,
  ClientConfigs,
  CreateLinkTokenOptions,
  environments,
  TokenResponse
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

expressApp.post('/plaid/set-access-token', (req, res) => {
  const PUBLIC_TOKEN = req.body.public_token;
  plaidClient.exchangePublicToken(
    PUBLIC_TOKEN,
    (error: Error, tokenResponse: TokenResponse) => {
      if (error != null) {
        console.error(error);
        return res.status(500).send({
          error
        });
      }
      const ACCESS_TOKEN = tokenResponse.access_token;
      const ITEM_ID = tokenResponse.item_id;
      console.log({ tokenResponse });
      return res.status(200).send({
        access_token: ACCESS_TOKEN,
        item_id: ITEM_ID,
        error: null
      });
    }
  );
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
