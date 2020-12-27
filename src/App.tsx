import React from 'react';
import AppRouter from './Router';
import FirebaseProvider from './providers/FirebaseProvider';
import NotificationProvider from './providers/NotificationProvider';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <FirebaseProvider>
          <AppRouter />
          <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
        </FirebaseProvider>
      </NotificationProvider>
    </QueryClientProvider>
  );
}

export default App;
