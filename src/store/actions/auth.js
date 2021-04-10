import * as actionTypes from './actionTypes';

export const initAuth = () => {
  return {
    type: actionTypes.INIT_AUTH,
  };
};

export const authSucceeded = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCEEDED,
    idToken: idToken,
    localId: localId,
  };
};

export const authFailed = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  };
};

export const authLogout = () => {
  return { type: actionTypes.INIT_AUTH_LOGOUT };
};

export const authLogoutSucceeded = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = expirationTime => {
  return {
    type: actionTypes.INIT_CHECK_AUTH_LOGOUT,
    expirationTime: expirationTime * 1000,
  };
};

export const auth = (email, password, isSignup) => {
  return {
    type: actionTypes.START_AUTH,
    email: email,
    password: password,
    isSignup: isSignup,
  };
};

export const setDirectedPath = path => {
  return {
    type: actionTypes.SET_DIRECTED_PATH,
    path: path,
  };
};

export const autoCheckAndLogin = () => {
  return {
    type: actionTypes.START_CHECK_AUTH_LOGIN,
  };
};
