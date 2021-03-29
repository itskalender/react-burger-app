import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICES = {
  salad: 1,
  bacon: 0.7,
  cheese: 0.7,
  meat: 1.2,
};

const initialState = {
  ingredients: null,
  totalPrice: 4.0,
  error: false,
  building: false,
};

const setIngredients = (state, action) => {
  const updatedStateSetIng = updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    error: false,
    totalPrice: 4.0,
    building: false,
  });
  return updatedStateSetIng;
};

const fetchIngredientsFailed = (state, action) => {
  const updatedStateFailedIng = updateObject(state, { error: true });
  return updatedStateFailedIng;
};

const addIngredient = (state, action) => {
  const updatedIngAddIng = updateObject(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  });
  const updatedStateAddIng = updateObject(state, {
    ingredients: updatedIngAddIng,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  });
  return updatedStateAddIng;
};

const deleteIngredient = (state, action) => {
  const updatedIngDelIng = updateObject(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  });
  const updatedStateDelIng = updateObject(state, {
    ingredients: updatedIngDelIng,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true,
  });
  return updatedStateDelIng;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.DELETE_INGREDIENT:
      return deleteIngredient(state, action);
    default:
      return state;
  }
};

export default reducer;
