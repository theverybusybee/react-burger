import { fetchRegister } from "../../utils/fetchOrderData";

export const SET_USER_INFO = "SET_USERNAME";
export const FETCH_AUTH_REQUEST = "FETCH_AUTH_REQUEST";
export const FETCH_AUTH_SUCCESS = "FETCH_AUTH_SUCCESS";
export const FETCH_AUTH_ERROR = "FETCH_AUTH_ERROR";

export function setRegister(form) {
  return function (dispatch) {
    dispatch({ type: FETCH_AUTH_REQUEST });
    fetchRegister(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: FETCH_AUTH_SUCCESS,
            payload: res,
          });
        } else {
          dispatch({ type: FETCH_AUTH_ERROR });
        }
      })
      .catch(() =>
        dispatch({
          type: FETCH_AUTH_ERROR,
        })
      );
  };
}

export function authenticateUser() {
  return function (dispatch) {
    dispatch({ type: FETCH_AUTH_REQUEST });
    fetchRegister()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: FETCH_AUTH_SUCCESS,
            payload: res,
          });
        } else {
          dispatch({ type: FETCH_AUTH_ERROR });
        }
      })
      .catch(() =>
        dispatch({
          type: FETCH_AUTH_ERROR,
        })
      );
  };
}