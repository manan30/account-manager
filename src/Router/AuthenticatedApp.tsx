import React, { Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Loader from '../components/Loader';
import SideNav from '../components/SideNav';
import { useGlobalState } from '../providers/GlobalStateProvider';
import { generateRandomKey } from '../utils/Functions';

const AuthenticatedApp = () => {
  const { path: rootPath } = useRouteMatch();

  return (
    <div className='flex h-full w-full'>

      <div className='w-3/4'>
        <Suspense fallback={<Loader size={48} />}>
          <Switch></Switch>
        </Suspense>
      </div>
    </div>
  );
};

export default AuthenticatedApp;
