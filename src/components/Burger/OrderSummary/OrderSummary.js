import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';

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
      <p>Continue to Checkout?</p>
    </Auxiliary>
  );
};

export default orderSummary;
