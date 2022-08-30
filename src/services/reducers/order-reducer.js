export const orderInitialState = {
  totalPrice: 0,
  ingredients: [],
  buns: null,
};

export function init(orderInitialState) {
  return {
    ingredients: orderInitialState,
  };
}

export default function orderReducer(state, { type, payload }, init) {
  switch (type) {
    case "SET_INGREDIENTS": {
      return { ...state, ingredients: [...state.ingredients, payload] };
    }
    case "SET_BUNS": {
      return { ...state, buns: payload };
    }
    case "ADD": {
      return { ...state, totalPrice: state.totalPrice + payload };
    }
    case "reset": {
      return { ...state, totalPrice: orderInitialState };
    }
    default:
      throw new Error(`Wrong type of action: ${type}`);
  }
}
