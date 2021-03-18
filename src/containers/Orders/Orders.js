import React, { Component } from 'react';

import classes from './Orders.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    ordersData: [],
    error: null,
  };

  // Fetching orders
  componentDidMount() {
    let ordersData = [];
    axios
      .get('/orders.json')
      .then(response => {
        if (response.data) {
          const datasObj = response.data;
          const arr = Object.entries(datasObj);
          arr.forEach(data => ordersData.push(data[1]));
          this.setState({ ordersData: ordersData });
        }
      })
      .catch(error => {
        this.setState({ error: error });
      });
  } // Max added 'unique' ids into datas but i didn't, i use indexes for keys.

  render() {
    // Rendering Orders Depending on Whether We Have
    let order = (
      <h2
        style={{
          fontWeight: '400',
          color: '#40a4c8',
        }}
      >
        You haven't got any previous order
      </h2>
    );

    // Outputting Orders
    if (this.state.ordersData.length > 0) {
      order = this.state.ordersData.map((data, index) => {
        return (
          <Order
            key={index}
            ingredients={data.ingredients}
            totalPrice={data.totalPrice}
            orderNum={index + 1}
          />
        );
      });
    }

    return <div className={classes.Orders}>{order}</div>;
  }
}

export default withErrorHandler(Orders, axios);
