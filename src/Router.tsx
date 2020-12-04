import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SideNav from './components/SideNav';
import NotificationManager from './components/NotificationManager';

const routes = [
  { path: '/', component: React.lazy(() => import('./pages/Overview')) },
  {
    path: '/new-transaction',
    component: React.lazy(() => import('./pages/NewTransaction/withContext'))
  },
  {
    path: '/new-creditor',
    component: React.lazy(() => import('./pages/NewCreditor'))
  }
];

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <div className='flex h-full w-full'>
          <SideNav />
          <Suspense fallback={<div />}>
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
      </BrowserRouter>
      <NotificationManager />
    </>
  );
};

export default Router;
