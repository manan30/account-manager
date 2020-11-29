import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideNav from './components/SideNav';
import NotificationProvider from './contexts/NotificationContext';
import NotificationManager from './components/Notification';

const routes = [
  { path: '/', component: React.lazy(() => import('./pages/Overview')) },
  {
    path: '/new-transaction',
    component: React.lazy(() => import('./pages/NewTransaction/withContext.js'))
  }
];

function App() {
  return (
    <NotificationProvider>
      <Router>
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
      </Router>
      <NotificationManager />
    </NotificationProvider>
  );
}

export default App;
