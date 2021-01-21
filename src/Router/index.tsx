import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loader from '../components/Loader';
import NotificationManager from '../components/NotificationManager';
import AuthenticatedApp from './AuthenticatedApp';

const AuthenticationPage = React.lazy(() => import('../pages/Authentication'));
const UnauthorizedUserModal = React.lazy(
  () => import('../pages/Authentication/UnauthorizedUserModal')
);
const NotFoundPage = React.lazy(() => import('../pages/404'));

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <div className='flex h-full w-full'>
          <Suspense fallback={<Loader size={48} />}>
            <Switch>
              <Route
                path='/authentication'
                component={AuthenticationPage}
                exact
              />
              <Route
                path='/unauthorized'
                component={UnauthorizedUserModal}
                exact
              />
              <Route path='/' component={AuthenticatedApp} />
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
      <NotificationManager />
    </>
  );
};

export default Router;
