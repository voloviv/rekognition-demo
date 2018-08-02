/* @flow */

import axios from 'axios';

import type { Dispatch, ThunkAction } from '../types';

export const sendContactForm = (formData: Object): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'CONTACT_LOADING' });

  const URL = 'api/contact';

  try {
    const { data } = await axios.post(URL, formData);

    /* istanbul ignore next */
    dispatch({ type: 'CONTACT_SUCCESS', data });
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: 'CONTACT_FAILURE', err: err.message });
  }
};

export const resetContactForm = (): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'CONTACT_RESET' });
};

export const resetContactFormError = (): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'CONTACT_RESET_ERROR' });
};

export const resetContactFormSuccess = (): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'CONTACT_RESET_SUCCESS' });
};

export const throwError = (err: String): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'UPDATE_ERROR_MESSAGE', err });
};
