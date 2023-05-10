import {
  FETCH_API_REQUEST,
  FETCH_API_SUCCESS,
  FETCH_API_ERROR,
} from "../constants/api-state";
import { TIngredient } from "../types/data";
import { TApiStateActions } from "../actions/api-state-actions";

type TApiStateReducerTyping = {
  isLoading: boolean;
  hasError: boolean;
  data: [] | ReadonlyArray<TIngredient>;
};

const initialState: TApiStateReducerTyping = {
  isLoading: false,
  hasError: false,
  data: [],
};

const apiStateReducer = (
  state = initialState,
  action: TApiStateActions
): TApiStateReducerTyping => {
  switch (action.type) {
    case FETCH_API_REQUEST: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    }
    case FETCH_API_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        data: action.payload,
      };
    }
    case FETCH_API_ERROR: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    default:
      return state;
  }
};

export default apiStateReducer;
