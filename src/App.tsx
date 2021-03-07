import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import FirebaseProvider from './providers/FirebaseProvider';
import GlobalStateProvider from './providers/GlobalStateProvider';
import NotificationProvider from './providers/NotificationProvider';
import AppRouter from './Router';

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
