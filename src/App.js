import React from 'react';
import AppRouter from './Router';
import FirebaseProvider from './contexts/FirebaseContext';

function App() {
  return (
    <FirebaseProvider>
      <AppRouter />
    </FirebaseProvider>
  );
}

export default App;
