import React, { Component } from 'react';
import { connect } from 'react-redux';

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
          isAuthenticated={this.props.isAuthenticated}
        />
        <Toolbar
          clicked={this.showSideDrawerHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};

export default connect(mapStateToProps)(Layout);
