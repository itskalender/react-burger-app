import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// NOTE : withRouter a bak -- Props sağlıyor.

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));
const asyncCheckout = asyncComponent(() =>
  import('./containers/Checkout/Checkout')
);
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));

class App extends Component {
  componentDidMount() {
    this.props.onAutoCheckAndLogin();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/my-orders" component={asyncOrders} />
          <Route path="/login" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.idToken !== null };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoCheckAndLogin: () => dispatch(actions.autoCheckAndLogin()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
