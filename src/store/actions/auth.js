import * as actionTypes from './actionTypes';
import axios from 'axios';

export const initAuth = () => {
  return {
    type: actionTypes.INIT_AUTH,
  };
};

const authSucceeded = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCEEDED,
    idToken: idToken,
    localId: localId,
  };
};

const authFailed = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  };
};

export const authLogout = () => {
  localStorage.removeItem('idToken');
  localStorage.removeItem('localId');
  localStorage.removeItem('expirationDate');
  return { type: actionTypes.AUTH_LOGOUT };
};

const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => dispatch(authLogout()), +expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(initAuth());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA30QXtPOxWpGqbBs7qwzR791duV_CV9xo';
    if (!isSignup) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA30QXtPOxWpGqbBs7qwzR791duV_CV9xo';
    }
    axios
      .post(url, authData)
      .then(res => {
        const expirationDate = new Date(
          new Date().getTime() + parseInt(res.data.expiresIn, 10) * 1000
        );
        localStorage.setItem('idToken', res.data.idToken);
        localStorage.setItem('localId', res.data.localId);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(authSucceeded(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFailed(error.response.data.error));
      });
  };
};

export const setDirectedPath = path => {
  return {
    type: actionTypes.SET_DIRECTED_PATH,
    path: path,
  };
};

export const autoCheckAndLogin = () => {
  return dispatch => {
    const idToken = localStorage.getItem('idToken');
    if (idToken) {
      const idToken = localStorage.getItem('idToken');
      const localId = localStorage.getItem('localId');
      const exprationDate = localStorage.getItem('expirationDate');
      if (new Date().getTime() > exprationDate) return;
      dispatch(authSucceeded(idToken, localId));
      const expirationTime = (new Date(exprationDate) - new Date()) / 1000;
      checkAuthTimeout(expirationTime);
    } else {
      dispatch(authLogout());
    }
  };
};
