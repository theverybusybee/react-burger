import { FETCH_API_REQUEST, FETCH_API_SUCCESS, FETCH_API_ERROR } from "../actions/actions";

export default function reducer(state, { type, payload }) {
  switch (type) {
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
        data: payload,
      };
    }
    case FETCH_API_ERROR: {
      return {
        ...state,
        isLoading: false,
        hasError: payload,
      };
    }
    default:
      return state;
  }
}
