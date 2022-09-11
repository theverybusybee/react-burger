import { combineReducers } from "redux";

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_CURRENT_CONSTRUCTOR_INGREDIENTS,
  SET_BUNS,
  SET_MODAL_INGREDIENT,
  DELETE_MODAL_INGREDIENT
} from "../actions/order";

const initialState = {
  allIngredients: [],
  allIngredientsRequest: false,
  allIngredientsFailed: false,

  currentConstructorIngredients: [],

  currentModalIngredient: {},

  createdOrder: {},

  buns: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return { ...state, allIngredientsRequest: true };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        allIngredients: action.payload,
        allIngredientsRequest: false,
        allIngredientsFailed: false,
      };
    case GET_INGREDIENTS_FAILED:
      return { ...state, allIngredientsFailed: true };

    case SET_CURRENT_CONSTRUCTOR_INGREDIENTS:
      return { ...state, currentConstructorIngredients: action.payload };

    case SET_BUNS:
      return { ...state, buns: action.payload };

      case SET_MODAL_INGREDIENT:
      return { ...state, currentModalIngredient: action.payload };

      case DELETE_MODAL_INGREDIENT: 
      return { ...state, currentModalIngredient: {} }

    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  order: orderReducer,
});
