import React, { Component } from 'react';

import classes from './Orders.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

class Orders extends Component {
  state = {
    ordersData: [],
  };
  componentDidMount() {
    let ordersData = [];
    axios.get('/orders.json').then(response => {
      const datasObj = response.data;
      console.log(datasObj);
      const arr = Object.entries(datasObj);
      console.log(arr);
      arr.forEach(data => ordersData.push(data[1]));
      console.log(ordersData);
      this.setState({ ordersData: ordersData });
    });
  }

  render() {
    console.log(this.state);
    // Outputting orders
    let order = this.state.ordersData.map((data, index) => {
      return (
        <Order key={index} ingredients={data.ingredients} orderNum={index} />
      );
    });
    return <div className={classes.Orders}>{order}</div>;
  }
}

export default Orders;
