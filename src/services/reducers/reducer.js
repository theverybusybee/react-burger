import { combineReducers } from "redux";

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_CURRENT_CONSTRUCTOR_INGREDIENTS,
  SET_BUNS,
  SET_MODAL_INGREDIENT,
  RESET_MODAL_INGREDIENT,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  RESET_ORDER_NUMBER
} from "../actions/actions";

const initialState = {
  allIngredients: [],
  allIngredientsRequest: false,
  allIngredientsFailed: false,

  currentConstructorIngredients: [],

  currentModalIngredient: {},

  createdOrderNumber: null,
  createdOrderNumberRequest: false,
  createdOrderNumberFailed: false,

  buns: [],
};

const reducer = (state = initialState, action) => {
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

      case RESET_MODAL_INGREDIENT: 
      return { ...state, currentModalIngredient: {} }

      case GET_ORDER_NUMBER_REQUEST: {
        return { ...state, createdOrderNumberRequest: true }
      }

      case GET_ORDER_NUMBER_SUCCESS: {
        return { ...state, createdOrderNumberRequest: false, createdOrderNumberFailed: false, createdOrderNumber: action.payload }
      }

      case GET_ORDER_NUMBER_FAILED: {
        return { ...state, createdOrderNumberFailed: true }
      }

      case RESET_ORDER_NUMBER: {
        return { ...state, createdOrderNumber: null }
      }

    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  reducer: reducer,
});