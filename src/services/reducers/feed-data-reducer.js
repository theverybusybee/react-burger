import { SET_CURRENT_ORDER, SET_ALL_ORDERS } from "../actions/feed-data";

const initialState = {
  currentOrder: {},
  isLoading: false,
  hasError: false,
  allOrders: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

const feedDataReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case SET_CURRENT_ORDER:
      return { ...state, currentOrder: payload };

    case SET_ALL_ORDERS:
      return { ...state, allOrders: {orders: payload.orders, total: payload.total, totalToday: payload.totalToday} };

    default:
      return state;
  }
};

export default feedDataReducer;
