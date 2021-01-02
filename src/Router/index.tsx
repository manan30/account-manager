import React, { Suspense, useEffect } from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation
} from 'react-router-dom';
import SideNav from '../components/SideNav';
import NotificationManager from '../components/NotificationManager';
import Loader from '../components/Loader';
import { useFirebaseContext } from '../providers/FirebaseProvider';
import {
  useGlobalDispatch,
  useGlobalState
} from '../providers/GlobalStateProvider';
import ProtectedRoute from './ProtectedRoute';

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
  return (
    <>
      <BrowserRouter>
        <div className='flex h-full w-full'>
          <SideNav />
          <div className='w-3/4'>
            <Suspense fallback={<Loader size={48} />}>
              <Switch>
                <Route
                  path='/authentication'
                  component={AuthenticationPage}
                  exact
                />
                {routes.map((route, i) => {
                  const key = i;
                  return (
                    <ProtectedRoute
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
