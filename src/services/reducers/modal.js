import {
  SET_MODAL_INGREDIENT,
  RESET_MODAL_INGREDIENT,
  RESET_ORDER_NUMBER,
  SET_VISIBILITY_INGREDIENT,
  REMOVE_VISIBILITY,
  SET_ORDER_NUMBER_VISIBILITY,
} from "../actions/modal";

const initialState = {
  currentModalIngredient: {},
  isVisible: {
    ingredient: false,
    order: false,
    orderNumber: false,
  },
};

const modalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MODAL_INGREDIENT:
      return { ...state, currentModalIngredient: payload };

    case RESET_MODAL_INGREDIENT:
      return {
        ...state,
        currentModalIngredient: initialState.currentModalIngredient,
      };

    case RESET_ORDER_NUMBER: {
      return { ...state, createdOrderNumber: initialState.createdOrderNumber };
    }
    case SET_VISIBILITY_INGREDIENT: {
      return { ...state, isVisible: { ...state.isVisible, ingredient: true } };
    }
    case REMOVE_VISIBILITY: {
      return {
        ...state,
        isVisible: { ingredient: false, order: false, orderNumber: false },
      };
    }
    case SET_ORDER_NUMBER_VISIBILITY: {
      return { ...state, isVisible: { ...state.isVisible, orderNumber: true } };
    }

    default:
      return state;
  }
};

export default modalReducer;
