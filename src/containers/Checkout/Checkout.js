import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
    return (
      <div className={classes.Checkout}>
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
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
  };
};

export default connect(mapStateToProps)(Checkout);
