import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    contactData: {
      name: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Name' },
        value: '',
        validation: { required: true },
        isValid: false,
        touched: false,
        errMsg: 'Please write a valid name.',
      },

      email: {
        elementType: 'input',
        elementConfig: { type: 'email', placeholder: 'Email' },
        value: '',
        validation: { required: true },
        isValid: false,
        touched: false,
        errMsg: 'Please write a valid email.',
      },

      country: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Country' },
        value: '',
        validation: { required: true },
        isValid: false,
        touched: false,
        errMsg: 'Please write a valid country.',
      },

      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: { required: true },
        isValid: false,
        touched: false,
        errMsg: 'Please write a valid street.',
      },

      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code',
        },
        value: '',
        validation: { required: true, minLength: 6, maxLength: 6 },
        isValid: false,
        touched: false,
        errMsg: 'Please write a valid postal code.',
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
        validation: {},
        isValid: true,
      },
    },
    formIsValid: false,
    totalPrice: 0,
  };

  // Sendind data to RestAPI
  orderHandler = e => {
    e.preventDefault(); // It's not necessary in here for me, why?

    // Adjust sending data before submiting
    const contactData = {};
    for (let inputIdentifier in this.state.contactData) {
      contactData[inputIdentifier] = this.state.contactData[
        inputIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      totalPrice: this.props.price,
      contactData: contactData,
      userId: this.props.localId,
    };
    // Sending to BackEnd
    this.props.onOrderHandler(order, this.props.token);
  };

  // Input Changing
  inputChangedHandler = (event, changedInput) => {
    const updatedContactData = updateObject(this.state.contactData, {
      [changedInput]: updateObject(this.state.contactData[changedInput], {
        value: event.target.value,
        isValid: checkValidity(
          event.target.value,
          this.state.contactData[changedInput].validation
        ),
        touched: true,
      }),
    });

    // Checking Form Validity
    let formIsValid = true;
    for (let inputEl in updatedContactData) {
      formIsValid = updatedContactData[inputEl].isValid && formIsValid;
    }

    this.setState({
      contactData: updatedContactData,
      formIsValid: formIsValid,
    });
  };

  render() {
    // Outputting Dynamic Input Elements
    const contactDataObj = this.state.contactData;
    let contactDataArr = [];
    for (let inputName in contactDataObj) {
      contactDataArr.push({ ...contactDataObj[inputName], id: inputName });
    }
    const inputs = contactDataArr.map(inputData => {
      return (
        <Input
          key={inputData.id}
          elementType={inputData.elementType}
          elementConfig={inputData.elementConfig}
          value={inputData.value}
          valid={inputData.isValid}
          // shouldValidate={inputData.validation} // Dropbox'ı bu şekilde de ilk başta isValid = false yapmaktan kurtarabilirdik.
          touched={inputData.touched}
          errMsg={inputData.errMsg}
          changed={event => this.inputChangedHandler(event, inputData.id)}
        />
      );
    });

    // Showing Spinner When Send the Contact-Form
    let form = (
      <form onSubmit={this.orderHandler}>
        {inputs}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.idToken,
    localId: state.auth.localId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderHandler: (orderData, token) =>
      dispatch(actions.sendOrder(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
