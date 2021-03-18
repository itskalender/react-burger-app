import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
    totalPrice: 0,
  };

  orderHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer: {
        name: 'Kalender',
        email: 'kalender@gmail.com',
        country: 'Turkey',
        address: 'Turgut Ozal Bul. 101 Apt.',
      },
      deliveryMethod: 'fastest',
    };
    axios
      .post('/orders.json', order)
      .then(response => {
        console.log(this.props, 'SENDED');
        this.props.history.replace('/');
        return this.setState({ loading: false });
      })
      .catch(error => {
        return this.setState({ loading: false });
      });
  };

  render() {
    console.log(this.props);
    // Showing Spinner
    let form = (
      <form>
        <input
          className={classes.Inputs}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Inputs}
          type="email"
          name="email"
          placeholder="Your email"
        />
        <input
          className={classes.Inputs}
          type="text"
          name="postalCode"
          placeholder="Your Postal Code"
        />
        <input
          className={classes.Inputs}
          type="text"
          name="street"
          placeholder="Your Street"
        />
      </form>
    );
    if (this.state.loading) form = <Spinner />;

    //
    return (
      <div className={classes.ContactData}>
        <h3>CONTACT FORM</h3>
        {form}
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </div>
    );
  }
}

export default ContactData;
