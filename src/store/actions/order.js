import * as actionTypes from './actionTypes';

export const sendOrderSucceeded = (id, orderData) => {
  return {
    type: actionTypes.SEND_ORDER_SUCCEEDED,
    orderId: id,
    orderData: orderData,
  };
};

export const sendOrderFailed = error => {
  return {
    type: actionTypes.SEND_ORDER_FAILED,
    error: error,
  };
};

export const showLoading = () => {
  return {
    type: actionTypes.SHOW_LOADING,
    loading: true,
  };
};

export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE,
  };
};

export const sendOrder = (orderData, token) => {
  return {
    type: actionTypes.SEND_ORDER,
    orderData: orderData,
    token: token,
  };
};

export const fetchOrderSucceeded = orders => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCEEDED,
    orders: orders,
  };
};

export const fetchOrderFailed = error => {
  return {
    type: actionTypes.FETCH_ORDER_FAILED,
  };
};

export const initFetchOrder = () => {
  return {
    type: actionTypes.INIT_FETCH_ORDER,
  };
};

export const fetchOrderStart = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDER_START,
    token: token,
    userId: userId,
  };
};
