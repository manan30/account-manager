import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useGlobalState } from '../providers/GlobalStateProvider';

type ProtectedRouteProps = {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  path,
  component: Component
}) => {
  const { user } = useGlobalState();

  return (
    <Route
      path={path}
      render={({ location }) => {
        return user ? (
          <Component />
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
