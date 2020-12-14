import React from 'react';
import AppRouter from './Router';
import FirebaseProvider from './providers/FirebaseProvider';
import NotificationProvider from './providers/NotificationProvider';

function App() {
  return (
    <NotificationProvider>
      <FirebaseProvider>
        <AppRouter />
      </FirebaseProvider>
    </NotificationProvider>
  );
}

export default App;
