import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
  // Outputting appropriate <li> items
  const listOfIngredients = Object.keys(props.ingredients).map(ingrKey => {
    return (
      <li key={ingrKey}>
        {ingrKey[0].toUpperCase() + ingrKey.slice(1)}:{' '}
        {props.ingredients[ingrKey]}
      </li>
    );
  });

  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>Here is your following ingredients:</p>
      <ul>{listOfIngredients}</ul>
      <p>
        <strong>Total Price: {props.totalPrice.toFixed(2)} $</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType={'Danger'} clicked={props.closedModal}>
        CANCEL
      </Button>
      <Button btnType={'Success'} clicked={props.continuedPurchase}>
        CONTINUE
      </Button>
    </Auxiliary>
  );
};

export default orderSummary;
