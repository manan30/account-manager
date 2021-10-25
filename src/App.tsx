import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import FirebaseProvider from './providers/FirebaseProvider';
import GlobalStateProvider from './providers/GlobalStateProvider';
import NotificationProvider from './providers/NotificationProvider';
import AppRouter from './Router';
import axios from 'redaxios';
import { BASE_ENDPOINT } from './utils/Constants/APIConstants';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    axios.defaults.baseURL = BASE_ENDPOINT;
  }, []);

  return (
    <GlobalStateProvider>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <FirebaseProvider>
            <AppRouter />
            <ReactQueryDevtools initialIsOpen={false} position='bottom-left' />
          </FirebaseProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </GlobalStateProvider>
  );
}

export default App;
