import { setCookie } from "../../utils/cookie";
import {
  fetchRegister,
  fetchLogin,
  fetchLogout,
  updateUserData
} from "../../utils/fetchOrderData";

export const SET_USER_INFO = "SET_USERNAME";
export const FETCH_AUTH_REQUEST = "FETCH_AUTH_REQUEST";
export const FETCH_AUTH_SUCCESS = "FETCH_AUTH_SUCCESS";
export const FETCH_AUTH_ERROR = "FETCH_AUTH_ERROR";
export const SET_USER_NULL = "SET_USER_NULL";

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

export function authenticateUser(form) {
  return function (dispatch) {
    dispatch({ type: FETCH_AUTH_REQUEST });
    fetchLogin(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: FETCH_AUTH_SUCCESS,
            payload: res,
          });
          setCookie("token", res.accessToken);
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

export function logoutFromAccount(token) {
  return function (dispatch) {
    dispatch({ type: FETCH_AUTH_REQUEST });
    fetchLogout(token)
      .then((res) => {
        console.log(res);
        if (res && res.success) {
          dispatch({
            type: SET_USER_NULL,
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

export function updateData(form) {
  return function (dispatch) {
    dispatch({ type: FETCH_AUTH_REQUEST });
    updateUserData(form)
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

export function getData() {
  return function (dispatch) {
    dispatch({ type: FETCH_AUTH_REQUEST });
    updateUserData()
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