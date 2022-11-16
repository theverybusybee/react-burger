import {
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_ERROR,
  DELETE_USER,
  SET_LOGIN_STATUS,
} from "../constants/auth";
import { TAuthActions } from "../actions/auth";

type TAuthReducerInitialState = {
  isLoading: boolean;
  hasError: boolean;
  userInfo: { name: string; email: string };
  isLogin: boolean;
};

const initialState: TAuthReducerInitialState = {
  isLoading: false,
  hasError: false,
  userInfo: { name: "", email: "" },
  isLogin: false,
};

const authUserReducer = (
  state = initialState,
  action: TAuthActions
): TAuthReducerInitialState => {
  switch (action.type) {
    case FETCH_AUTH_REQUEST: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    }
    case FETCH_AUTH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        userInfo: { name: action.payload.user.name, email: action.payload.user.email },
      };
    }
    case FETCH_AUTH_ERROR: {
      return {
        ...state,
        isLoading: false,
        hasError: false,
      };
    }

    case DELETE_USER: {
      return {
        ...state,
        userInfo: initialState.userInfo,
        isLogin: initialState.isLogin,
      };
    }

    case SET_LOGIN_STATUS: {
      return {
        ...state,
        isLogin: true,
      };
    }

    default:
      return state;
  }
};

export default authUserReducer;
