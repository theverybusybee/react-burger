import { TAB_SWITCH } from "../constants/tab";
import { TModalsActions } from "../actions/tab";

type TTabSwitchReducerInitialState = {
  currentTab: string;
};

const initialState: TTabSwitchReducerInitialState = {
  currentTab: "Булки",
};

const tabReducer = (
  state = initialState,
  action: TModalsActions
): TTabSwitchReducerInitialState => {
  switch (action.type) {
    case TAB_SWITCH: {
      return {
        ...state,
        currentTab: action.value,
      };
    }

    default:
      return state;
  }
};

export default tabReducer;
