import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_ORDER_SUCCEEDED:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        orders: state.orders.concat([newOrder]), //  INFORMATION  :
        loading: false,
      };
    case actionTypes.SEND_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
