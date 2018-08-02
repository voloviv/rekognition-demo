/* @flow */

import axios from 'axios';
import upload from 'superagent';

import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';

export function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export const initDemo = (): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'DEMO_INIT_LOADING' });

  try {
    await axios.post('/api/demo-init');
    dispatch({ type: 'DEMO_INIT_SUCCESS' });
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: 'DEMO_INIT_FAILURE', err: JSON.parse(err).error });
  }
};

export const registerFace = (file: Object): ThunkAction => async (
  dispatch: Dispatch
  // getState: GetState
) => {
  dispatch({ type: 'DEMO_LOADING' });

  try {
    await delay(1000);
    const data = await new Promise((resolve, reject) =>
      upload
        .post('/api/register-face')
        .attach('register', file)
        .end((err, res) => {
          if (err) {
            reject(err.response.text);
            return;
          }
          const result = JSON.parse(res.text);
          if (result.detect_result.FaceDetails.length === 0) {
            reject(new Error('Face Not Found'));
            return;
          }
          const face = result.detect_result.FaceDetails[0];

          // When using the index faces instead of the detect faces rekog API
          // if (result.detect_result.FaceRecords.length == 0) {reject('Face Not Found'); return};
          // const face = result.detect_result.FaceRecords[0]
          resolve({
            error: false,
            faceRegistered: true,
            faceUrl: result.upload_url,
            faceAttributes: { FaceDetail: face },
            searchResult: result.search_result
          });
        })
    ).catch(err => {
      throw err;
    });
    dispatch({ type: 'DEMO_SUCCESS', data });
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: 'DEMO_FAILURE', err: JSON.parse(err).error });
  }
};

export const resetDemo = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'DEMO_RESET' });
};

export const validationError = (error: String): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'DEMO_FAILURE', err: error });
};
