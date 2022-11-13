import { TAB_SWITCH } from "../constants/tab";

const initialState = {
  currentTab: "Булки",
};

const tabReducer = (state = initialState, { type, payload, value }) => {
  switch (type) {
    case TAB_SWITCH: {
      return {
        ...state,
        currentTab: value,
      };
    }

    default:
      return state;
  }
};

export default tabReducer;
