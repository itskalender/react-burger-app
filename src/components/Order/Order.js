import React from 'react';

import classes from './Order.css';

const order = props => {
  const ingredientsObj = props.ingredients;

  // Ingredients
  const ingredients = Object.keys(ingredientsObj).map(ingrKey => {
    return (
      <span className={classes.IndividualIngredients} key={ingrKey}>
        {ingrKey[0].toUpperCase() + ingrKey.slice(1)} ({ingredientsObj[ingrKey]}
        )
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <h3>ORDER {props.orderNum}</h3>
      <p>Ingredients: {ingredients}</p>
      <p>
        Price:{' '}
        <span style={{ fontWeight: '700' }}>
          {props.totalPrice.toFixed(2)}{' '}
        </span>
        <span
          style={{
            fontWeight: '700',
            color: 'green',
            fontStyle: 'italic',
          }}
        >
          $
        </span>
      </p>
    </div>
  );
};

export default order;
