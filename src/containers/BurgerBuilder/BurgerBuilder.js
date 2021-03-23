import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    isPurchasing: false,
  };

  // Fetching Ingredient from Backend
  componentDidMount() {
    this.props.onInitIngredients();
  }

  // UI Handler
  toggleOrderButton = updatedIngredients => {
    if (!updatedIngredients) return false;
    const ingredients = { ...updatedIngredients };
    const ingrSum = Object.keys(updatedIngredients)
      .map(ingrKey => {
        return ingredients[ingrKey];
      })
      .reduce((acc, currEl) => {
        return acc + currEl;
      }, 0);

    return ingrSum > 0;
  };

  showModalHandler = () => {
    this.setState({ isPurchasing: true });
  };

  closeModalHandler = () => {
    this.setState({
      isPurchasing: false,
    });
  };

  // Sending Form to Dummy Backend
  continuePurchaseHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    // Deciding Disable Buttons
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    // Conditionally Showing Spinner
    let orderSummary = <Spinner />;

    // Waiting Ingredients from Backend
    let burger = <Spinner />;
    if (this.props.ings) {
      burger = <Burger ingredients={this.props.ings} />;
      orderSummary = (
        <OrderSummary
          closedModal={this.closeModalHandler}
          continuedPurchase={this.continuePurchaseHandler}
          ingredients={this.props.ings}
          totalPrice={this.props.price}
        />
      );
    }

    // Handling Error for Getting Ingredient from Backend
    if (this.props.err) {
      burger = (
        <p
          style={{
            textAlign: 'center',
            fontSize: '1rem',
            boxSizing: 'border-box',
            border: '1px solid #703b09',
            width: '50%',
            padding: '1rem 2rem',
            margin: 'auto',
            marginBottom: '1rem',
            borderRadius: '1rem',
          }}
        >
          We're sorry. Couldn't get the data from server. Error messsage is:{' '}
          {this.props.err.message}
        </p>
      );
    }

    return (
      <Auxiliary>
        <Modal
          clicked={this.closeModalHandler}
          isPurchasing={this.state.isPurchasing}
        >
          {orderSummary}
        </Modal>
        {burger}
        <BuildControls
          addIngredient={this.props.onAddIngredient}
          deleteIngredient={this.props.onDeleteIngredient}
          isDisabled={disabledInfo}
          totalPrice={this.props.price}
          isPurchasable={this.toggleOrderButton(this.props.ings)}
          clicked={this.showModalHandler}
        />
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    err: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ingName =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onDeleteIngredient: ingName =>
      dispatch(burgerBuilderActions.deleteIngredients(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
