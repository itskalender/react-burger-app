import React from 'react';

import classes from './Order.css';

const order = props => {
  const ingredientsObj = props.ingredients;

  // Ingredients
  const ingredients = Object.keys(ingredientsObj).map(ingrKey => {
    return (
      <p key={ingrKey}>
        Ingredient: {ingrKey[0].toUpperCase() + ingrKey.slice(1)} (
        {ingredientsObj[ingrKey]})
      </p>
    );
  });

  return (
    <div className={classes.Order}>
      <h3>ORDER {props.orderNum + 1}</h3>
      {ingredients}
      <p>Price:</p>
    </div>
  );
};

export default order;
