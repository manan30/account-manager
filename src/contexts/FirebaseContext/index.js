import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FirebaseService from '../../services/firebase';

const FirebaseContext = React.createContext();

function FirebaseProvider({ children }) {
  return (
    <FirebaseContext.Provider value={new FirebaseService()}>
      {children}
    </FirebaseContext.Provider>
  );
}

FirebaseProvider.propTypes = {
  children: PropTypes.element.isRequired
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