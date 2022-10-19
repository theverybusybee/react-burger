import {
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_ERROR,
  DELETE_USER,
  SET_LOGIN_STATUS,
} from "../actions/auth";

const initialState = {
  isLoading: false,
  hasError: false,
  userInfo: { name: "", email: "" },
  isLogin: false,
};

const authUserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
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
        userInfo: { name: payload.user.name, email: payload.user.email },
      };
    }
    case FETCH_AUTH_ERROR: {
      return {
        ...state,
        isLoading: false,
        hasError: payload,
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
