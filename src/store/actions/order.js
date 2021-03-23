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

export const sendOrder = orderData => {
  return dispatch => {
    axios
      .post('/orders.json', orderData)
      .then(res => dispatch(sendOrderSucceeded(res.data.name, orderData)))
      .catch(error => dispatch(sendOrderFailed(error.message)));
  };
};
