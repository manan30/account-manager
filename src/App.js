import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideNav from './components/SideNav';

const routes = [
  { path: '/', component: React.lazy(() => import('./pages/Overview')) },
  {
    path: '/new-transaction',
    component: React.lazy(() => import('./pages/NewTransaction'))
  }
];

function App() {
  return (
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
  );
}

export default App;
