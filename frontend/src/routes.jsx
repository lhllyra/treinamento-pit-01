/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

import Navbar from './components/NavBar';

import routes from './routelist';
import { tokenKey } from './utils/constants';

const publicRoutes = routes.filter((route) => !route.private);
const privateRoutes = routes.filter((route) => route.private);

const PublicRouter = ({ component: Component, ...otherProps }) => {
  const isAuth = localStorage.getItem(tokenKey);

  return (
    <Route
      exact
      {...otherProps}
      render={(props) => {
        if (isAuth) {
          return <Redirect to={{ pathname: '/home' }} />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

const PrivateRouter = ({ component: Component, ...otherProps }) => {
  const isAuth = localStorage.getItem(tokenKey);

  return (
    <Route
      exact
      {...otherProps}
      render={(props) => {
        if (isAuth) {
          return <Component {...props} />;
        }
        return <Redirect to={{ pathname: '/login' }} />;
      }}
    />
  );
};

const Routes = () => (
  <BrowserRouter>
    <Navbar title="Pitang" routes={routes} />
    <Switch>
      {publicRoutes.map((route) => (
        <PublicRouter key={route.path} {...route} />
      ))}

      {privateRoutes.map((route) => (
        <PrivateRouter key={route.path} {...route} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Routes;
