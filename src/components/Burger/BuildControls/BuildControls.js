import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controller = [
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.totalPrice.toFixed(2)} $</strong>
      </p>
      {controller.map(cntrl => (
        <BuildControl
          key={cntrl.label}
          label={cntrl.label}
          addIngredient={() => props.addIngredient(cntrl.type)}
          deleteIngredient={() => props.deleteIngredient(cntrl.type)}
          isDisabled={props.isDisabled[cntrl.type]}
        />
      ))}
      <button className={classes.OrderButton} disabled={!props.purshasable}>
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
