/* @flow */

import fp from 'lodash/fp';

import type { DemoType, Action } from '../types';

const initialState = {
  readyStatus: '',
  err: null,
  faceRegistered: false,
  faceAttributes: null,
  faceUrl: null,
  searchResult: null,
  registerFacePending: false,
  registerFaceError: false
};

export default (state: DemoType = initialState, action: Action): DemoType => {
  switch (action.type) {
    case 'DEMO_LOADING':
      return fp.assign(state, {
        readyStatus: 'DEMO_LOADING',
        registerFacePending: true
      });
    case 'DEMO_FAILURE': {
      console.log(action);
      return fp.assign(state, {
        readyStatus: 'DEMO_FAILURE',
        registerFaceError: { message: action.err },
        registerFacePending: false
      });
    }
    case 'DEMO_SUCCESS': {
      return fp.assign(state, {
        readyStatus: 'DEMO_SUCCESS',
        registerFacePending: true,
        faceRegistered: true,
        ...action.data
      });
    }
    case 'DEMO_INIT_LOADING':
      return fp.assign(state, {
        readyStatus: 'DEMO_INIT_LOADING',
        registerFaceError: action.err,
        registerFacePending: false
      });
    case 'DEMO_INIT_FAILURE':
      return fp.assign(state, {
        readyStatus: 'DEMO_INIT_FAILURE',
        registerFaceError: { message: action.err },
        registerFacePending: false
      });
    case 'DEMO_INIT_SUCCESS':
      return fp.assign(state, {
        readyStatus: 'DEMO_INIT_SUCCESS'
      });
    case 'DEMO_RESET':
      return fp.assign(state, initialState);
    default:
      return state;
  }
};
