import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    contactData: {
      name: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Name' },
        value: '',
      },

      email: {
        elementType: 'input',
        elementConfig: { type: 'email', placeholder: 'Email' },
        value: '',
      },

      country: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Country' },
        value: '',
      },

      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
      },

      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Postal Code',
        },
        value: '',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
      },
    },
    loading: false,
    totalPrice: 0,
  };

  // Sendind data to RestAPI
  orderHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      contactData: this.state.contactData,
    };
    axios
      .post('/orders.json', order)
      .then(response => {
        this.props.history.replace('/');
        return this.setState({ loading: false });
      })
      .catch(error => {
        return this.setState({ loading: false });
      });
  };

  // Input Changing
  inputChangedHandler = (event, changedInput) => {
    const updatedContactData = { ...this.state.contactData };
    const updatedInputEl = { ...updatedContactData[changedInput] };
    updatedInputEl.value = event.target.value; // Değiştireceğimiz yere kadar kopyalayarak indik.
    updatedContactData[changedInput] = updatedInputEl; // Daha sonra değiştirerek yukarı çıktık.
    this.setState({
      contactData: updatedContactData,
    });
  };

  render() {
    // Outputting Dynamic Input Elements
    const contactDataObj = this.state.contactData;
    let contactDataArr = [];
    for (let inputName in contactDataObj) {
      contactDataArr.push({ ...contactDataObj[inputName], id: inputName });
    }
    console.log(contactDataArr);
    const inputs = contactDataArr.map(inputData => {
      return (
        <Input
          key={inputData.id}
          elementType={inputData.elementType}
          elementConfig={inputData.elementConfig}
          value={inputData.value}
          changed={event => this.inputChangedHandler(event, inputData.id)}
        />
      );
    });

    // Showing Spinner When Send the Contact-Form
    let form = (
      <form>
        {inputs}
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h3>CONTACT FORM</h3>
        {form}
      </div>
    );
  }
}

export default ContactData;
