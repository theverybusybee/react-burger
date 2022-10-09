import {
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_ERROR,
  SET_USER_NULL,
} from "../actions/auth";

const initialState = {
  isLoading: false,
  hasError: false,
  userInfo: { name: "", email: "" },
  accessToken: "",
  refreshToken: "",
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
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
      };
    }
    case FETCH_AUTH_ERROR: {
      return {
        ...state,
        isLoading: false,
        hasError: payload,
      };
    }

    case SET_USER_NULL: {
      return {
        ...state,
        userInfo: null,
        accessToken: null,
        refreshToken: null,
      };
    }

    default:
      return state;
  }
};

export default authUserReducer;
