import React, { Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Loader from '../components/Loader';
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

const AuthenticatedApp = () => {
  const { user, unauthorizedUser } = useGlobalState();
  const { path: rootPath } = useRouteMatch();

  console.log({ rootPath });

  return (
    <div className='flex h-full w-full'>
      <SideNav />
      <div className='w-3/4'>
        <Suspense fallback={<Loader size={48} />}>
          <Switch>
            {routes.map(({ path, component: Component }) => (
              <Route
                key={generateRandomKey()}
                path={`${rootPath}/${path}`}
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
        </Suspense>
      </div>
    </div>
  );
};

export default AuthenticatedApp;
