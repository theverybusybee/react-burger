import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  RESET_ORDER_NUMBER,
} from "../constants/api-data";

import {
  FETCH_REFRESH_TOKEN_REQUEST,
  FETCH_REFRESH_TOKEN_SUCCESS,
  FETCH_REFRESH_TOKEN_ERROR,
} from "../constants/auth";

import { TIngredient } from "../types/data";
import { TApiDataActions } from "../actions/api-data";
import { TTokenActions } from "../actions/auth";

type TApiDataState = {
  allIngredients: Array<TIngredient>;
  allIngredientsRequest: boolean;
  allIngredientsFailed: boolean;

  createdOrderNumber: null | number;
  createdOrderNumberRequest: boolean;
  createdOrderNumberFailed: boolean;

  tokenRequest: boolean;
  isTokenUpdated: boolean;
  tokenUpdateData: boolean;
};

const initialState: TApiDataState = {
  allIngredients: [],
  allIngredientsRequest: false,
  allIngredientsFailed: false,

  createdOrderNumber: null,
  createdOrderNumberRequest: false,
  createdOrderNumberFailed: false,

  tokenRequest: false,
  isTokenUpdated: false,
  tokenUpdateData: false,
};

const apiDataReducer = (
  state = initialState,
  action: TApiDataActions | TTokenActions
): TApiDataState => {
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

    case GET_ORDER_NUMBER_REQUEST: {
      return { ...state, createdOrderNumberRequest: true };
    }

    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        createdOrderNumberRequest: false,
        createdOrderNumberFailed: false,
        createdOrderNumber: action.payload,
      };
    }

    case RESET_ORDER_NUMBER: {
      return {
        ...state,
        createdOrderNumber: initialState.createdOrderNumber,
      };
    }

    case FETCH_REFRESH_TOKEN_REQUEST: {
      return { ...state, tokenRequest: true };
    }

    case FETCH_REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        tokenRequest: false,
        isTokenUpdated: true,
        tokenUpdateData: true,
      };
    }

    case FETCH_REFRESH_TOKEN_ERROR: {
      return {
        ...state,
        isTokenUpdated: true,
        tokenUpdateData: false,
      };
    }

    default:
      return state;
  }
};

export default apiDataReducer;
