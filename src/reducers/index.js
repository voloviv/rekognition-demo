/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import userInfo from './userInfo';
import demo from './demo';
import home from './home';
import contact from './contact';

const reducers = {
  demo,
  home,
  userInfo,
  router,
  contact,
  form: formReducer
};

export type Reducers = typeof reducers;
export default combineReducers(reducers);
