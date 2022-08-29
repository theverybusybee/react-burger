export const orderInitialState = {
  totalPrice: 0,
  stuffing: null,
  buns: null,
};

export default function orderReducer(state, action) {
  switch (action.type) {
    case "SET_STUFFING": {
      return { ...state, stuffing: action.payload };
    }
    case "SET_BUNS": {
      return { ...state, buns: action.payload };
    }
    case "ADD": {
      return { ...state, totalPrice: state.totalPrice + action.payload };
    }
    case "reset": {
      return { ...state, totalPrice: orderInitialState };
    }
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}
