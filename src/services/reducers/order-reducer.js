import { SET_INGREDIENTS, SET_BUNS, ADD, RESET } from "../actions/actions";

export const orderInitialState = {
  totalPrice: 0,
  ingredients: [],
  buns: null,
};

export default function orderReducer(state, { type, payload }) {
  switch (type) {
    case SET_INGREDIENTS: {
      return { ...state, ingredients: [...state.ingredients, payload] };
    }
    case SET_BUNS: {
      return { ...state, buns: payload };
    }
    case ADD: {
      return { ...state, totalPrice: state.totalPrice + payload };
    }
    case RESET: {
      return { ...state, totalPrice: orderInitialState };
    }
    default:
      throw new Error(`Wrong type of action: ${type}`);
  }
}
