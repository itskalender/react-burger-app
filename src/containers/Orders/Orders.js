import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Orders.css';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    // Fetching Orders
    this.props.onFetchOrders();
  } // Max added 'unique' ids into datas but i didn't, i use indexes for keys.

  render() {
    let order = <Spinner />;
    if (!this.props.loading) {
      order =
        this.props.orders.length > 0 ? (
          this.props.orders.map((data, index) => {
            return (
              <Order
                key={index}
                ingredients={data.ingredients}
                totalPrice={data.totalPrice}
                orderNum={index + 1}
              />
            );
          })
        ) : (
          <h2>You haven't got any previous order</h2>
        );
    }

    return <div className={classes.Orders}>{order}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => {
      dispatch(actions.fetchOrderStart());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios)); //  QUESTION : Why doesn't withErrorHandler wark? (componentDidMount)
