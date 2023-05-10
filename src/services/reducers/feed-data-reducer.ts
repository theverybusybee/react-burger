import { SET_CURRENT_ORDER } from "../constants/feed-data";
import { TOrders } from "../types/data";
import { TFeedDataActions } from "../actions/feed-data";
type TFeedDataInitialState = {
  currentOrder: {} | Array<TOrders>;
  isLoading: false;
  hasError: false;
  allOrders: {
    orders: [];
    total: 0;
    totalToday: 0;
  };
};

const initialState: TFeedDataInitialState = {
  currentOrder: {},
  isLoading: false,
  hasError: false,
  allOrders: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

const feedDataReducer = (
  state = initialState,
  action: TFeedDataActions
): TFeedDataInitialState => {
  switch (action.type) {
    case SET_CURRENT_ORDER:
      return { ...state, currentOrder: action.payload };

    default:
      return state;
  }
};

export default feedDataReducer;
