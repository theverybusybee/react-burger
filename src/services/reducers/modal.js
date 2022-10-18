import {
  SET_MODAL_INGREDIENT,
  RESET_MODAL_INGREDIENT,
  RESET_ORDER_NUMBER,
  SET_VISIBILITY,
  REMOVE_VISIBILITY,
  SET_ORDER_VISIBILITY,
  REMOVE_ORDER_VISIBILITY,
  
} from "../actions/modal";

const initialState = {
  currentModalIngredient: {},
  isVisible: false,
  isOrderVisible: false
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
    case SET_VISIBILITY: {
      return { ...state, isVisible: !state.isVisible }
    }
    case REMOVE_VISIBILITY: {
      return { ...state, isVisible: initialState.isVisible }
    }
     case SET_ORDER_VISIBILITY: {
      return { ...state, isOrderVisible: !state.isVisible }
    }
    case REMOVE_ORDER_VISIBILITY: {
      return { ...state, isOrderVisible: initialState.isVisible }
    }

    default:
      return state;
  }
};

export default modalReducer;