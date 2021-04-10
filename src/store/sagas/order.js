import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions/index';

export function* sendOrderSaga(action) {
  yield put(actions.showLoading());
  try {
    const response = yield axios.post(
      '/orders.json?auth=' + action.token,
      action.orderData
    );
    yield put(actions.sendOrderSucceeded(response.data.name, action.orderData));
  } catch (error) {
    yield put(actions.sendOrderFailed(error.message));
  }
}

export function* fetchOrderStartSaga(action) {
  yield put(actions.initFetchOrder());
  let ordersData = [];
  const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
  try {
    const response = yield axios.get('/orders.json' + queryParams);
    const datasObj = response.data;
    const arr = Object.entries(datasObj);
    arr.forEach(data => ordersData.push(data[1]));
    yield put(actions.fetchOrderSucceeded(ordersData));
  } catch (error) {
    yield put(actions.fetchOrderFailed(error));
  }
}
