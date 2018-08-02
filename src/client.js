/* @flow */

import React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { loadComponents } from 'loadable-components';
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import ReactGA from 'react-ga';

import configureStore from './utils/configureStore';
import routes from './routes';
import { GA_KEY } from './config';

// Get the initial state from server-side rendering
const initialState = window.__INITIAL_STATE__;
const history = createHistory();

history.listen(location => {
  ReactGA.initialize(GA_KEY);
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const store = configureStore(history, initialState);

const render = (Routes: Array<Object>) => {
  // Create a theme instance.
  const theme = createMuiTheme({});
  hydrate(
    <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            {renderRoutes(Routes)}
          </ConnectedRouter>
        </Provider>
      </AppContainer>
    </MuiThemeProvider>,
    // $FlowFixMe: isn't an issue
    document.getElementById('react-view')
  );
};

// Load all components needed before starting rendering (loadable-components setup)
loadComponents().then(() => {
  render(routes);
});

if (module.hot) {
  // Enable webpack hot module replacement for routes
  module.hot.accept('./routes', () => {
    try {
      const nextRoutes = require('./routes').default;

      render(nextRoutes);
    } catch (error) {
      console.error(`==> 😭  Routes hot reloading error ${error}`);
    }
  });
}
