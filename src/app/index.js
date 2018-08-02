/* @flow */

import 'assets/scss/material-kit-react.css';
import React from 'react';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';

import { Layout } from '../components';

import config from '../config';

type Props = { route: Object };

const App = ({ route }: Props) => (
  <div>
    <Helmet {...config.app} />
    {/* {renderRoutes(route.routes)} */}
    <Layout>{renderRoutes(route.routes)}</Layout>
  </div>
);

export default hot(module)(App);
