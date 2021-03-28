import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem to="/" exact>
        Burger Builder
      </NavigationItem>

      {props.isAuthenticated ? (
        <NavigationItem to="/my-orders">My Orders</NavigationItem>
      ) : null}

      {!props.isAuthenticated ? (
        <NavigationItem to="/login">Login</NavigationItem>
      ) : (
        <NavigationItem to="/logout">Logout</NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
