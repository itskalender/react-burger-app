import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';

import axios from 'axios';

import * as actions from '../actions/index';

export function* authLogoutSaga(action) {
  yield localStorage.removeItem('idToken');
  yield localStorage.removeItem('localId');
  yield localStorage.removeItem('expirationDate');
  yield put(actions.authLogoutSucceeded());
}

export function* checkAuthTimeoutSaga(action) {
  console.log(action.expirationTime);
  yield delay(action.expirationTime);
  yield put(actions.authLogout());
}

export function* authSaga(action) {
  yield put(actions.initAuth());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA30QXtPOxWpGqbBs7qwzR791duV_CV9xo';
  if (!action.isSignup) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA30QXtPOxWpGqbBs7qwzR791duV_CV9xo';
  }
  try {
    const response = yield axios.post(url, authData);
    const expirationDate = yield new Date(
      new Date().getTime() + parseInt(response.data.expiresIn, 10) * 1000
    );
    yield localStorage.setItem('idToken', response.data.idToken);
    yield localStorage.setItem('localId', response.data.localId);
    yield localStorage.setItem('expirationDate', expirationDate);

    yield put(
      actions.authSucceeded(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFailed(error.response.data.error));
  }
}

export function* autoCheckAndLoginSaga() {
  const idToken = yield localStorage.getItem('idToken');
  if (idToken) {
    const idToken = yield localStorage.getItem('idToken');
    const localId = yield localStorage.getItem('localId');
    const exprationDate = yield localStorage.getItem('expirationDate');
    if (new Date().getTime() > exprationDate) return;
    yield put(actions.authSucceeded(idToken, localId));
    const expirationTime = yield (new Date(exprationDate) - new Date()) / 1000;
    yield put(actions.checkAuthTimeout(expirationTime));
  } else {
    yield put(actions.authLogout());
  }
}
