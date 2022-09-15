import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_CURRENT_CONSTRUCTOR_INGREDIENTS,
  SET_MODAL_INGREDIENT,
  RESET_MODAL_INGREDIENT,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  RESET_ORDER_NUMBER,
  TAB_SWITCH,
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

  currentTab: "Булки",
};

const reducer = (state = initialState, { type, payload, value }) => {
  switch (type) {
    case GET_INGREDIENTS_REQUEST:
      return { ...state, allIngredientsRequest: true };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        allIngredients: payload,
        allIngredientsRequest: false,
        allIngredientsFailed: false,
      };
    case GET_INGREDIENTS_FAILED:
      return { ...state, allIngredientsFailed: true };

    case SET_CURRENT_CONSTRUCTOR_INGREDIENTS:
      return { ...state, currentConstructorIngredients: payload };

    case SET_MODAL_INGREDIENT:
      return { ...state, currentModalIngredient: payload };

    case RESET_MODAL_INGREDIENT:
      return {
        ...state,
        currentModalIngredient: initialState.currentModalIngredient,
      };

    case GET_ORDER_NUMBER_REQUEST: {
      return { ...state, createdOrderNumberRequest: true };
    }

    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        createdOrderNumberRequest: false,
        createdOrderNumberFailed: false,
        createdOrderNumber: payload,
      };
    }

    case GET_ORDER_NUMBER_FAILED: {
      return { ...state, createdOrderNumberFailed: true };
    }

    case RESET_ORDER_NUMBER: {
      return { ...state, createdOrderNumber: initialState.createdOrderNumber };
    }

    case TAB_SWITCH: {
      return {
        ...state,
        currentTab: value,
      };
    }

    default:
      return state;
  }
};

export default reducer;
