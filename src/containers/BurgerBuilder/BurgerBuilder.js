import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// const INGREDIENT_PRICES is also possible
const ingredientsPrices = {
  salad: 1,
  bacon: 0.7,
  cheese: 0.7,
  meat: 1.2,
};

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purshasable: false,
  };

  addIngredientHandler = type => {
    // Ingredients
    const prevAmount = this.state.ingredients[type];
    const upgradedAmount = prevAmount + 1;

    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = upgradedAmount;

    // Price
    const prevPrice = this.state.totalPrice;
    const newPrice = prevPrice + ingredientsPrices[type];

    // Setting State
    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice,
    });
    // Toggling Order Button
    this.toggleOrderButton(newIngredients);
  };

  deleteIngredientHandler = type => {
    // Ingredients
    const prevAmount = this.state.ingredients[type];
    const upgradedAmount = prevAmount - 1;

    if (upgradedAmount < 0) return;

    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = upgradedAmount;

    // Price
    const prevPrice = this.state.totalPrice;
    const newPrice = prevPrice - ingredientsPrices[type];

    // Setting State
    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice,
    });
    // Toggling Order Button
    this.toggleOrderButton(newIngredients);
  };

  toggleOrderButton = updatedIngredients => {
    const ingredients = { ...updatedIngredients };
    const ingrSum = Object.keys(updatedIngredients)
      .map(ingrKey => {
        return ingredients[ingrKey];
      })
      .reduce((acc, currEl) => {
        return acc + currEl;
      }, 0);

    this.setState({ purshasable: ingrSum > 0 });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Auxiliary>
        <Modal>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          deleteIngredient={this.deleteIngredientHandler}
          isDisabled={disabledInfo}
          totalPrice={this.state.totalPrice}
          purshasable={this.state.purshasable}
        />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
