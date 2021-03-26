import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const sendOrderSucceeded = (id, orderData) => {
  return {
    type: actionTypes.SEND_ORDER_SUCCEEDED,
    orderId: id,
    orderData: orderData,
  };
};

const sendOrderFailed = error => {
  return {
    type: actionTypes.SEND_ORDER_FAILED,
    error: error,
  };
};

const showLoading = () => {
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
  return dispatch => {
    dispatch(showLoading());
    axios
      .post('/orders.json?auth=' + token, orderData)
      .then(res => {
        dispatch(sendOrderSucceeded(res.data.name, orderData));
      })
      .catch(error => dispatch(sendOrderFailed(error.message)));
  };
};

//

const fetchOrderSucceeded = orders => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCEEDED,
    orders: orders,
  };
};

const fetchOrderFailed = error => {
  return {
    type: actionTypes.FETCH_ORDER_FAILED,
  };
};

export const initFetchOrder = () => {
  return {
    type: actionTypes.INIT_FETCH_ORDER,
  };
};

export const fetchOrderStart = token => {
  return dispatch => {
    dispatch(initFetchOrder());
    let ordersData = [];
    axios
      .get('/orders.json?auth=' + token)
      .then(response => {
        const datasObj = response.data;
        const arr = Object.entries(datasObj);
        arr.forEach(data => ordersData.push(data[1]));
        dispatch(fetchOrderSucceeded(ordersData));
      })
      .catch(error => {
        dispatch(fetchOrderFailed(error));
      });
  };
};
