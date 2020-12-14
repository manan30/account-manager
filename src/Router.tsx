import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SideNav from './components/SideNav';
import NotificationManager from './components/NotificationManager';
import Loader from './components/Loader';

type RouteType = {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
};

const routes: RouteType[] = [
  { path: '/', component: React.lazy(() => import('./pages/Overview')) },
  {
    path: '/new-transaction',
    component: React.lazy(() => import('./pages/NewTransaction/withProvider'))
  },
  {
    path: '/new-creditor',
    component: React.lazy(() => import('./pages/NewCreditor'))
  },
  {
    path: '/creditors',
    component: React.lazy(() => import('./pages/Creditors'))
  },
  process.env.NODE_ENV !== 'production' && {
    path: '/seed',
    component: React.lazy(() => import('./pages/Seed/withProvider'))
  }
].filter(Boolean) as RouteType[];

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <div className='flex h-full w-full'>
          <SideNav />
          <div className='flex-auto'>
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
