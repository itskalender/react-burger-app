import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

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
    isPurchasable: false,
    isPurchasing: false,
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

  // UI Handler
  toggleOrderButton = updatedIngredients => {
    const ingredients = { ...updatedIngredients };
    const ingrSum = Object.keys(updatedIngredients)
      .map(ingrKey => {
        return ingredients[ingrKey];
      })
      .reduce((acc, currEl) => {
        return acc + currEl;
      }, 0);

    this.setState({ isPurchasable: ingrSum > 0 });
  };

  showModalHandler = () => {
    this.setState({ isPurchasing: true });
  };

  closeModalHandler = () => {
    this.setState({
      isPurchasing: false,
    });
  };

  continuePurchaseHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Kalender',
        email: 'kalender@gmail.com',
        country: 'Turkey',
        address: 'Turgut Ozal Bul. 101 Apt.',
      },
      deliveryMethod: 'fastest',
    };

    axios.post('/orders.json', order).then(response => console.log(response));

    this.closeModalHandler();
  };

  //

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Auxiliary>
        <Modal
          clicked={this.closeModalHandler}
          isPurchasing={this.state.isPurchasing}
        >
          <OrderSummary
            closedModal={this.closeModalHandler}
            continuedPurchase={this.continuePurchaseHandler}
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          deleteIngredient={this.deleteIngredientHandler}
          isDisabled={disabledInfo}
          totalPrice={this.state.totalPrice}
          isPurchasable={this.state.isPurchasable}
          clicked={this.showModalHandler}
        />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
