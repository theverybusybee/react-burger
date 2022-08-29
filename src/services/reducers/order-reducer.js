export const orderInitialState = {
  totalPrice: 0,
  buns: null,
  stuffing: null,
}; 

export default function orderReducer(state, action) {
  switch (action.type) {
    case 'SET_STUFFING': {
      return { ...state, stuffing: action.payload }
    }
    case 'SET_BUNS': {
      return { ...state, buns: action.payload }
    }
    case 'ADD': {
      return {totalPrice : state.totalPrice + action.payload};
    }
    case 'reset': {
      return {totalPrice : orderInitialState};
    }
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}