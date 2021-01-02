import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useGlobalState } from '../providers/GlobalStateProvider';

type ProtectedRouteProps = {
  path: string;
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, children }) => {
  const { user } = useGlobalState();

  return (
    <Route
      path={path}
      render={({ location }) => {
        return user ? (
          children
        ) : (
          <Redirect
            to={{ pathname: '/authentication', state: { from: location } }}
          />
        );
      }}
      exact
    />
  );
};

export default ProtectedRoute;
