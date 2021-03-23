import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ingName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName,
  };
};

export const deleteIngredients = ingName => {
  return {
    type: actionTypes.DELETE_INGREDIENT,
    ingredientName: ingName,
  };
};

//
const sendError = error => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error: error,
  };
};

// Action itself
const fetchIngredients = ingrs => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingrs,
  };
};

// Redux Thunk - Async Code
export const initIngredients = () => {
  return dispatch => {
    axios
      .get(
        'https://react-burger-app-9c122-default-rtdb.firebaseio.com/ingredients.json'
      )
      .then(response => dispatch(fetchIngredients(response.data)))
      .catch(error => dispatch(sendError(error)));
  };
};
