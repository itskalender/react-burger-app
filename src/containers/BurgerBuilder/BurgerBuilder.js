import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

// const INGREDIENT_PRICES is also possible
const ingredientsPrices = {
  salad: 1,
  bacon: 0.7,
  cheese: 0.7,
  meat: 1.2,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4.0,
    isPurchasable: false,
    isPurchasing: false,
    loading: false,
    error: false,
  };

  // Fetching Ingredient from Backend
  componentDidMount() {
    axios
      .get(
        'https://react-burger-app-9c122-default-rtdb.firebaseio.com/ingredients.json'
      )
      .then(response => this.setState({ ingredients: response.data }))
      .catch(error => this.setState({ error: error }));
  }

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

  // Sending Form to Dummy Backend
  continuePurchaseHandler = () => {
    // Another way of getting search params
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        `${encodeURIComponent(i)}=${encodeURIComponent(
          this.state.ingredients[i]
        )}`
      );
    }
    queryParams.push(`price=${this.state.totalPrice.toFixed(2)}`);
    console.log(queryParams);
    const queryParamsString = queryParams.join('&');
    console.log(queryParamsString, 'QUERY PARAMS');

    /* const ingredients = { ...this.state.ingredients };
    const ingredientsString = Object.keys(ingredients)
      .map(ingr => `${ingr}=${ingredients[ingr]}`)
      .join('&'); */
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParamsString, // or ingredientsString
    });
  };

  render() {
    // Deciding Disable Buttons
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    // Conditionally Showing Spinner
    let orderSummary = <Spinner />;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    // Waiting Ingredients from Backend
    let burger = <Spinner />;
    if (this.state.ingredients) {
      burger = <Burger ingredients={this.state.ingredients} />;
      orderSummary = (
        <OrderSummary
          closedModal={this.closeModalHandler}
          continuedPurchase={this.continuePurchaseHandler}
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
        />
      );
    }

    // Handling Error for Getting Ingredient from Backend
    if (this.state.error) {
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
          {this.state.error.message}
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

export default withErrorHandler(BurgerBuilder, axios);
