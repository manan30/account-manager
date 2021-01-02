import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useGlobalState } from '../providers/GlobalStateProvider';

type ProtectedRouteProps = {
  path: string;
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, children }) => {
  const { user } = useGlobalState();

  console.log({ user });

  return (
    <Route
      path={path}
      render={({ location }) => {
        // return user ? (
        //   <div>Hello</div>
        // ) : (
        //   <Redirect
        //     to={{ pathname: '/authentication', state: { from: location } }}
        //   />
        // );
        return children;
      }}
      exact
    />
  );
};

export default ProtectedRoute;
