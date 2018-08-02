/* @flow */

import App from './app';
import { asyncAbout, asyncDemo, NotFound } from './pages';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: asyncDemo // Add your route here
        // loadData: () => [
        //   // usersAction.fetchUsersIfNeeded()
        //   // Add other pre-fetched actions here
        // ]
      },
      {
        path: '/about',
        exact: true,
        component: asyncAbout // Add your route here
        // loadData: () => [
        //   // usersAction.fetchUsersIfNeeded()
        //   // Add other pre-fetched actions here
        // ]
      },
      {
        component: NotFound
      }
    ]
  }
];
