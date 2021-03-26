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
// Action itself
const setIngredients = ingrs => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingrs,
  };
};
// for Error
const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

// Redux Thunk - Async Code
export const initIngredients = () => {
  return dispatch => {
    axios
      .get(
        'https://react-burger-app-9c122-default-rtdb.firebaseio.com/ingredients.json'
      )
      .then(response => dispatch(setIngredients(response.data)))
      .catch(error => dispatch(fetchIngredientsFailed()));
  };
};
