import {
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_ERROR,
} from "../actions/auth";

const initialState = {
  isLoading: false,
  hasError: false,
  userInfo: [],
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
        userInfo: {user: payload.user, accessToken: payload.accessToken, refreshToken: payload.refreshToken } ,
      };
    }
    case FETCH_AUTH_ERROR: {
      return {
        ...state,
        isLoading: false,
        hasError: payload,
      };
    }

    default:
      return state;
  }
};

export default authUserReducer;
