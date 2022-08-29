export default function reducer(state, action) {
  switch (action.type) {
    case "FETCH_API_REQUEST": {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    }
    case "FETCH_API_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        data: action.payload,
      };
    }
    case "FETCH_API_ERROR": {
      return {
        ...state,
        isLoading: false,
        hasError: action.payload,
      };
    }
    default:
      return state;
  }
}