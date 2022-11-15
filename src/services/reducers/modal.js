import {
  SET_MODAL_INGREDIENT,
  SET_ORDER_NUMBER_VISIBILITY,
  RESET_ORDER_NUMBER_VISIBILITY
} from "../constants/modal";

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

    case SET_ORDER_NUMBER_VISIBILITY: {
      return { ...state, isVisible: { ...state.isVisible, orderNumber: true } };
    }

    case RESET_ORDER_NUMBER_VISIBILITY: {
      return { ...state, isVisible: { ...state.isVisible, orderNumber: false } };
    }

    default:
      return state;
  }
};

export default modalReducer;
