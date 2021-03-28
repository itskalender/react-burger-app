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
        console.log(res);
        dispatch(authSucceeded(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(error => {
        console.log('error', error.response.data.error);
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
