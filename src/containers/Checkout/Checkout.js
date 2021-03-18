import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import classes from './Checkout.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const updatedIngredients = {};
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        this.setState({ totalPrice: param[1] });
      } else {
        updatedIngredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: updatedIngredients });
  }

  backToBurgerBuilder = () => {
    this.props.history.goBack();
  };

  goToPurchaseData = () => {
    this.props.history.replace(this.props.match.url + '/contact-data');
  };

  render() {
    return (
      <div className={classes.Checkout}>
        <CheckoutSummary
          purchaseCancelled={this.backToBurgerBuilder}
          purchaseContinued={this.goToPurchaseData}
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
        />
        <Route
          path={`${this.props.match.url}/contact-data`}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
