import React from 'react';
import AppRouter from './Router';
import FirebaseProvider from './providers/FirebaseProvider';
import NotificationProvider from './providers/NotificationProvider';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import GlobalStateProvider from 'providers/GlobalStateProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <GlobalStateProvider>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <FirebaseProvider>
            <AppRouter />
            <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
          </FirebaseProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </GlobalStateProvider>
  );
}

export default App;
