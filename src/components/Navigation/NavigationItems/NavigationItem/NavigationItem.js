import React from 'react';

import classes from './NavigationItem.css';

const navigationItem = props => {
  return (
    <li className={classes.NavigationItem}>
      <a className={props.isActive ? classes.active : null} href={props.to}>
        {props.children}
      </a>
    </li>
  );
};

export default navigationItem;
