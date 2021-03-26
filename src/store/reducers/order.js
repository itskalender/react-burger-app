import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const initPurchase = (state, action) => {
  return updateObject(state, { purchased: false });
};
const showLoading = (state, action) => {
  return updateObject(state, { loading: action.loading });
};
const sendOrderSucceeded = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    orders: state.orders.concat(newOrder), //  INFORMATION : array and object concating
    loading: false,
    purchased: true,
  });
};
const sendOrderFailed = (state, action) => {
  return updateObject(state, { loading: false });
};
const fetchOrderSucceeded = (state, action) => {
  return updateObject(state, {
    orders: [...action.orders],
    loading: false,
  });
};
const fetchOrderFailed = (state, action) => {
  return updateObject(state, { loading: false });
};
const initFetchOrder = (state, action) => {
  return updateObject(state, { loading: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_PURCHASE:
      return initPurchase(state, action);
    case actionTypes.SHOW_LOADING:
      return showLoading(state, action);
    case actionTypes.SEND_ORDER_SUCCEEDED:
      return sendOrderSucceeded(state, action);
    case actionTypes.SEND_ORDER_FAILED:
      return sendOrderFailed(state, action);
    case actionTypes.FETCH_ORDER_SUCCEEDED:
      return fetchOrderSucceeded(state, action);
    case actionTypes.FETCH_ORDER_FAILED:
      return fetchOrderFailed(state, action);
    case actionTypes.INIT_FETCH_ORDER:
      return initFetchOrder(state, action);
    default:
      return state;
  }
};

export default reducer;
