import React from 'react';

import classes from './Logo.css';
import imgBrand from '../../assets/images/burger-logo.png';

const logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={imgBrand} alt="MyBurger - Our Brand Logo" />
    </div>
  );
};

export default logo;
