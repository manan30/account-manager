import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Loader from '../components/Loader';
import NotificationManager from '../components/NotificationManager';
import SideNav from '../components/SideNav';
import { useGlobalState } from '../providers/GlobalStateProvider';
import { generateRandomKey } from '../utils/Functions';

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
  process.env.NODE_ENV !== 'production' && {
    path: '/seed',
    component: React.lazy(() => import('../pages/Seed'))
  }
].filter(Boolean) as RouteType[];

const AuthenticationPage = React.lazy(() => import('../pages/Authentication'));

const Router = () => {
  const { user, unauthorizedUser } = useGlobalState();

  return (
    <>
      <BrowserRouter>
        <div className='flex h-full w-full'>
          <SideNav />
          <Suspense fallback={<Loader size={48} />}>
            <Route
              path='/authentication'
              component={AuthenticationPage}
              exact
            />
            <Route path='/unauthorized' component={AuthenticationPage} exact />
            <div className='w-3/4'>
              <Switch>
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
              </Switch>
            </div>
          </Suspense>
        </div>
      </BrowserRouter>
      <NotificationManager />
    </>
  );
};

export default Router;
