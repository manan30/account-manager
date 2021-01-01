import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SideNav from './components/SideNav';
import NotificationManager from './components/NotificationManager';
import Loader from './components/Loader';
import { useFirebaseContext } from './providers/FirebaseProvider';

type RouteType = {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
};

const routes: RouteType[] = [
  { path: '/', component: React.lazy(() => import('./pages/Overview')) },
  {
    path: '/transactions',
    component: React.lazy(() => import('./pages/Transaction'))
  },
  {
    path: '/creditors',
    component: React.lazy(() => import('./pages/Creditors'))
  },
  {
    path: '/creditor/:id',
    component: React.lazy(() => import('./pages/CreditorDetails'))
  },
  {
    path: '/authentication',
    component: React.lazy(() => import('./pages/Authentication'))
  },
  process.env.NODE_ENV !== 'production' && {
    path: '/seed',
    component: React.lazy(() => import('./pages/Seed'))
  }
].filter(Boolean) as RouteType[];

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <div className='flex h-full w-full'>
          <SideNav />
          <div className='w-3/4'>
            <Suspense fallback={<Loader size={48} />}>
              <Switch>
                {routes.map((route, i) => {
                  const key = i;
                  return (
                    <Route
                      exact
                      key={key}
                      path={route.path}
                      component={route.component}
                    />
                  );
                })}
              </Switch>
            </Suspense>
          </div>
        </div>
      </BrowserRouter>
      <NotificationManager />
    </>
  );
};

export default Router;
