import * as actionTypes from './actionTypes';

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

export const setIngredients = ingrs => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingrs,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
  };
};
