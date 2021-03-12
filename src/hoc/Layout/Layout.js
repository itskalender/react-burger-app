import React, { Component } from 'react';

import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    isShowingSideDrawer: false,
  };

  showSideDrawerHandler = () => {
    this.setState({
      isShowingSideDrawer: true,
    });
  };

  closeSideDrawerHandler = () => {
    this.setState({
      isShowingSideDrawer: false,
    });
  };

  render() {
    return (
      <Auxiliary>
        <SideDrawer
          isShowingSideDrawer={this.state.isShowingSideDrawer}
          clicked={this.closeSideDrawerHandler}
        />
        <Toolbar clicked={this.showSideDrawerHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

export default Layout;
