import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Loader from '../components/Loader';
import NotificationManager from '../components/NotificationManager';
import Nav from '../components/Nav';
import { useGlobalState } from '../providers/GlobalStateProvider';
import { generateRandomKey } from '../utils/Functions';
import Helmet from '../components/Helmet';

const AuthenticationPage = React.lazy(() => import('../pages/Authentication'));
const UnauthorizedUserModal = React.lazy(
  () => import('../pages/Authentication/UnauthorizedUserModal')
);
const NotFoundPage = React.lazy(() => import('../pages/404'));

type RouteType = {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
};

const routes: RouteType[] = [
  { path: '/', component: React.lazy(() => import('../pages/Overview')) },
  {
    path: '/transactions',
    component: React.lazy(() => import('../pages/Transaction'))
  },
  {
    path: '/creditors',
    component: React.lazy(() => import('../pages/Creditors'))
  },
  {
    path: '/creditor/:id',
    component: React.lazy(() => import('../pages/CreditorDetails'))
  },
  {
    path: '/expenses',
    component: React.lazy(() => import('../pages/Spending'))
  },
  {
    path: '/accounts',
    component: React.lazy(() => import('../pages/Accounts'))
  },
  {
    path: '/recurring',
    component: React.lazy(() => import('../pages/Recurring'))
  },
  !import.meta.env.PROD && {
    path: '/seed',
    component: React.lazy(() => import('../pages/Seed'))
  }
].filter(Boolean) as RouteType[];

const Router = () => {
  const { user, unauthorizedUser } = useGlobalState();

  return (
    <>
      <BrowserRouter>
        <Helmet />
        <Nav />
        <Suspense fallback={<Loader size={48} />}>
          <main>
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
              {routes.map(({ path, component: Component }) => (
                <Route
                  key={generateRandomKey()}
                  path={path}
                  render={({ location }) => {
                    return user && !unauthorizedUser ? (
                      <Component />
                    ) : (
                      <Redirect
                        to={{
                          pathname: '/authentication',
                          state: { from: location }
                        }}
                      />
                    );
                  }}
                  exact
                />
              ))}
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </Suspense>
      </BrowserRouter>
      <NotificationManager />
    </>
  );
};

export default Router;
