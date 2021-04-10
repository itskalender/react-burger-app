import { takeEvery } from 'redux-saga/effects';

import {
  authLogoutSaga,
  checkAuthTimeoutSaga,
  authSaga,
  autoCheckAndLoginSaga,
} from './auth';

import { initIngredientsSaga } from './burgerBuilder';

import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
  yield takeEvery(actionTypes.INIT_AUTH_LOGOUT, authLogoutSaga);
  yield takeEvery(actionTypes.INIT_CHECK_AUTH_LOGOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.START_AUTH, authSaga);
  yield takeEvery(actionTypes.START_CHECK_AUTH_LOGIN, autoCheckAndLoginSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}
