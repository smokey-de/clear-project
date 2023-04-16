import {lazy, useLayoutEffect, useState} from 'react';
import {Navigate, Route, Router, Routes,} from 'react-router-dom';

import {routePaths} from '@/shared/config/routing';
import {routeHistory} from '@/shared/config/routing/historyRouter';
import {ChildrenProp} from '@/shared/types/utility';

import {PrivateRoute} from './private-route';

const Home = lazy(() => import('@/pages/home'));

interface RouteView {
  element: JSX.Element;
  children?: RouteView[];
  path?: string;
}

const routesView: RouteView[] = [
  {
    element: <PrivateRoute />,
    children: [
      {
        path: routePaths.root,
        element: <Home />,
      },
    ],
  },
  // {
  //   element: <Login />,
  //   children: [
  //     {
  //       path: routePaths.login,
  //       element: <SignIn />,
  //     },
  //     {
  //       path: routePaths.forgotPassword,
  //       element: <PasswordNew />,
  //     },
  //   ],
  // },
  {
    path: routePaths.notFound,
    element: <Navigate to={routePaths.root} />,
  },
];

const CustomRouter = ({ children }: ChildrenProp) => {
  const [state, setState] = useState({
    action: routeHistory.action,
    location: routeHistory.location,
  });

  useLayoutEffect(() => routeHistory.listen(setState), []);

  return (
    <Router
      location={state.location}
      navigationType={state.action}
      navigator={routeHistory}
    >
      {children}
    </Router>
  );
};

const renderRoutes = (routes: RouteView[]) => {
  return routes.map((route, index) => {
    if (route.children) {
      return (
        <Route key={index} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    } else {
      return <Route key={index} path={route.path} element={route.element} />;
    }
  });
};

export const RoutesViews = () => {
  return (
    <CustomRouter>
      <Routes>{renderRoutes(routesView)}</Routes>
    </CustomRouter>
  );
};
