import React from 'react';

import PropTypes from 'prop-types';
import classes from './BuildControl.css';

const buildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.deleteIngredient}
        disabled={props.isDisabled}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.addIngredient}>
        More
      </button>
    </div>
  );
};

// PropType Validation (I wrote it for practicing purposes, it's unnecassary tough.)
buildControl.propTypes = {
  label: PropTypes.string,
};

export default buildControl;
