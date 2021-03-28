import React from 'react';

import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = props => {
  return (
    <Auxiliary>
      <Backdrop
        isPurchasing={props.isShowingSideDrawer}
        clicked={props.clicked}
      />
      <div
        className={[
          classes.SideDrawer,
          props.isShowingSideDrawer ? classes.Open : classes.Close,
        ].join(' ')}
      >
        <div className={classes.logoContainer}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </Auxiliary>
  );
};

export default sideDrawer;
