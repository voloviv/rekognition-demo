/* @flow */

import fp from 'lodash/fp';

import type { ContactType, Action } from '../types';

const initialState = {
  err: null
};

export default (
  state: ContactType = initialState,
  action: Action
): ContactType => {
  switch (action.type) {
    case 'CONTACT_LOADING':
      return fp.assign(state, {
        readyStatus: 'CONTACT_LOADING'
      });
    case 'CONTACT_FAILURE': {
      console.log(action);
      return fp.assign(state, {
        readyStatus: 'CONTACT_FAILURE',
        err: { message: action.err }
      });
    }
    case 'CONTACT_SUCCESS': {
      return fp.assign(state, {
        readyStatus: 'CONTACT_SUCCESS',
        err: null,
        ...action.data
      });
    }
    case 'CONTACT_RESET':
      return fp.assign(state, initialState);
    case 'UPDATE_ERROR_MESSAGE':
      return fp.assign(state, { err: { message: action.err } });
    case 'CONTACT_RESET_ERROR':
      return fp.assign(state, {
        err: null,
        readyStatus: ''
      });
    case 'CONTACT_RESET_SUCCESS':
      return fp.assign(state, {
        readyStatus: ''
      });
    default:
      return state;
  }
};
