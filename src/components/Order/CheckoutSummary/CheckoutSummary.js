import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>WE HOPE IT TASTES WELL</h1>
      <Burger ingredients={props.ingredients} />
      <p style={{ fontSize: '1.5rem', fontWeight: '300' }}>
        <strong>
          {props.totalPrice}{' '}
          <span style={{ color: 'green', fontStyle: 'italic' }}>$</span>
        </strong>
      </p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
