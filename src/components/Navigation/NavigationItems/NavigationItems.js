import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem isActive={true} to={'/'}>
        Burger Builder
      </NavigationItem>
      <NavigationItem to={'/'}>Checkout</NavigationItem>
    </ul>
  );
};

export default navigationItems;
