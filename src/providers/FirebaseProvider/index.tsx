import React, { useContext } from 'react';
import { IFirebaseContext } from './firebase.interface';
import FirebaseService from '../../services/firebase';

const FirebaseContext = React.createContext<IFirebaseContext | undefined>(
  undefined
);

type FirebaseProviderProps = {
  children: React.ReactNode;
};

const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  return (
    <FirebaseContext.Provider value={FirebaseService()}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;

export const useFirebaseContext = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error(
      'useFirebaseContext must be used within a FirebaseProvider'
    );
  }
  return context;
};
