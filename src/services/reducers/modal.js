import {
  SET_MODAL_INGREDIENT,
  RESET_ORDER_NUMBER,
  SET_ORDER_NUMBER_VISIBILITY,
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

    case RESET_ORDER_NUMBER: {
      return { ...state, createdOrderNumber: initialState.createdOrderNumber };
    }

    default:
      return state;
  }
};

export default modalReducer;
