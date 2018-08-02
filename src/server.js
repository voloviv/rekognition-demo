/* eslint-disable */
/* @flow */

import path from 'path';
import logger from 'morgan';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import favicon from 'serve-favicon';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { getLoadableState } from 'loadable-components/server';
import Helmet from 'react-helmet';
import chalk from 'chalk';
import openBrowser from 'react-dev-utils/openBrowser';
import httpProxy from 'http-proxy';
import { createGenerateClassName } from 'material-ui/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import { SheetsRegistry } from 'react-jss/lib/jss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import createHistory from 'history/createMemoryHistory';
import configureStore from './utils/configureStore';
import renderHtml from './utils/renderHtml';
import routes from './routes';
// $FlowFixMe: isn't an issue
import assets from '../public/webpack-assets.json';
import { port, host, apiHost, apiPort, protocol } from './config';

const app = express();

const targetUrl = protocol + '://' + apiHost + ':' + apiPort;

const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});

app.use('/api', (req, res) => {
  console.log(targetUrl)
  proxy.web(req, res, {target: targetUrl});
  console.log('sent to proxy' + apiPort)
});

// Use helmet to secure Express with various HTTP headers
app.use(helmet());
// Prevent HTTP parameter pollution
app.use(hpp());
// Compress all requests
app.use(compression());

// Use for http request debug (show errors only)
app.use(logger('dev', { skip: (req, res) => res.statusCode < 400 }));
app.use(favicon(path.resolve(process.cwd(), 'public/favicon.ico')));

if (!__DEV__) {
  app.use(express.static(path.resolve(process.cwd(), 'public')));
} else {
  /* Run express as webpack dev server */

  const webpack = require('webpack');
  const webpackConfig = require('../tools/webpack/config.babel');
  const compiler = webpack(webpackConfig);

  compiler.apply(new webpack.ProgressPlugin());

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      headers: { 'Access-Control-Allow-Origin': '*' },
      hot: true,
      quiet: true, // Turn it on for friendly-errors-webpack-plugin
      noInfo: true,
      stats: 'minimal',
      serverSideRender: true
    })
  );

  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: false // Turn it off for friendly-errors-webpack-plugin
    })
  );
}

// Register server-side rendering middleware
app.get('*', (req, res) => {
  const history = createHistory();
  const store = configureStore(history);

  // The method for loading data from server-side
  const loadBranchData = (): Promise<any> => {
    const branch = matchRoutes(routes, req.path);

    const promises = branch.map(({ route, match }) => {
      if (route.loadData) {
        return Promise.all(
          route
            .loadData({ params: match.params, getState: store.getState })
            .map(item => store.dispatch(item))
        );
      }

      return Promise.resolve(null);
    });

    return Promise.all(promises);
  };

  (async () => {
    try {
      // Load data from server-side first
      await loadBranchData();

      const staticContext = {};

      const generateClassName = createGenerateClassName();
      const sheetsRegistry = new SheetsRegistry();
      // Create a theme instance.
      const theme = createMuiTheme({});

      const AppComponent = (
        <Provider store={store}>
          <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
              {/* Setup React-Router server-side rendering */}
              <StaticRouter location={req.path} context={staticContext}>
                {renderRoutes(routes)}
              </StaticRouter>
            </MuiThemeProvider>
          </JssProvider>
        </Provider>
      );

      // Check if the render result contains a redirect, if so we need to set
      // the specific status and redirect header and end the response
      if (staticContext.url) {
        res.status(301).setHeader('Location', staticContext.url);
        res.end();

        return;
      }

      // Extract loadable state from application tree (loadable-components setup)
      getLoadableState(AppComponent).then(loadableState => {
        const head = Helmet.renderStatic();
        const htmlContent = renderToString(AppComponent);
        const initialState = store.getState();
        const loadableStateTag = loadableState.getScriptTag();

        // Check page status
        const status = staticContext.status === '404' ? 404 : 200;

        const css = sheetsRegistry.toString()

        // Pass the route and initial state into html template
        res
          .status(status)
          .send(
            renderHtml(
              head,
              assets,
              css,
              htmlContent,
              initialState,
              loadableStateTag
            )
          );
      });
    } catch (err) {
      res.status(404).send('Not Found :(');

      console.error(chalk.red(`==> 😭  Rendering routes error: ${err}`));
    }
  })();
});

if (port) {
  app.listen(port, host, err => {
    const url = `http://${host}:${port}`;

    if (err) console.error(chalk.red(`==> 😭  OMG!!! ${err}`));

    console.info(chalk.green(`==> 🌎  Listening at ${url}`));

    // Open browser
    // if (openBrowser(url))
    //   console.info(chalk.green("==> 🖥️  Opened on your browser's tab!"));
  });
} else {
  console.error(
    chalk.red('==> 😭  OMG!!! No PORT environment variable has been specified')
  );
}
