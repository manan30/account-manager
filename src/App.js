import React from 'react';
import AppRouter from './Router';
import FirebaseProvider from './contexts/FirebaseContext';
import NotificationProvider from './contexts/NotificationContext';

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
