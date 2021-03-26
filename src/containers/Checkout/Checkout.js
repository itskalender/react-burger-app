import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Checkout.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  backToBurgerBuilder = () => {
    this.props.history.goBack();
  };

  goToPurchaseData = () => {
    this.props.history.replace(this.props.match.url + '/contact-data');
  };

  render() {
    let checkoutSummary = <Redirect to="/" />;
    let didPurchased = this.props.purchased ? <Redirect to="/" /> : null;
    if (this.props.ings)
      checkoutSummary = (
        <div className={classes.Checkout}>
          {didPurchased}
          <CheckoutSummary
            purchaseCancelled={this.backToBurgerBuilder}
            purchaseContinued={this.goToPurchaseData}
            ingredients={this.props.ings}
            totalPrice={this.props.price.toFixed(2)}
          />
          <Route
            path={`${this.props.match.url}/contact-data`}
            component={ContactData}
          />
        </div>
      );

    return checkoutSummary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
