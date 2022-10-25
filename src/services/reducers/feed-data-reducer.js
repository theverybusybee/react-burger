import {SET_CURRENT_ORDER} from "../actions/feed-data";

const initialState = {
  currentOrder: {},
  isLoading: false,
  hasError: false,
};

const feedDataReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case SET_CURRENT_ORDER:
      return { ...state, currentOrder: payload };
    default:
      return state;
  }
};

export default feedDataReducer;
