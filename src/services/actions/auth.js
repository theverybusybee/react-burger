import { setCookie } from "../../utils/cookie";
import {
  fetchRegister,
  fetchLogin,
  fetchLogout,
  updateUserData,
} from "../../utils/fetchOrderData";
import { checkResponse } from "../../utils/constants";
import { fetchToken } from "../../utils/fetchOrderData";

export const SET_USER_INFO = "SET_USERNAME";
export const FETCH_AUTH_REQUEST = "FETCH_AUTH_REQUEST";
export const FETCH_AUTH_SUCCESS = "FETCH_AUTH_SUCCESS";
export const FETCH_AUTH_ERROR = "FETCH_AUTH_ERROR";
export const SET_USER_NULL = "SET_USER_NULL";
export const SET_LOGIN_STATUS = "SET_LOGIN_STATUS";

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
          const authToken = res.accessToken.split("Bearer ")[1];
          const refreshToken = res.refreshToken;
          setCookie("token", authToken);
          localStorage.setItem("refreshToken", refreshToken);
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
          dispatch({
            type: SET_LOGIN_STATUS,
          });
          const authToken = res.accessToken.split("Bearer ")[1];
          const refreshToken = res.refreshToken;
          setCookie("token", authToken);
          localStorage.setItem("refreshToken", refreshToken);
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

export function logoutFromAccount() {
  return function (dispatch) {
    dispatch({ type: FETCH_AUTH_REQUEST });
    fetchLogout()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_USER_NULL,
          });
          dispatch({
            type: SET_LOGIN_STATUS,
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

export function updateData(name, email) {
  return function (dispatch) {
    dispatch({ type: FETCH_AUTH_REQUEST });
    updateUserData(name, email)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: FETCH_AUTH_SUCCESS,
            payload: res,
          });
        } else {
          throw res;
        }
      })
      .catch((err) =>
      console.log(err)
       
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

export const fetchWithRefreshToken = (url, options) => {
  return fetch(url, options)
    .then((res) => checkResponse(res))
    .catch((res) => {
      return res.json().then((err) => {
        if (err.message === "jwt expired") {
          return fetchToken().then((res) => {
            localStorage.setItem("refreshToken", res.refreshToken);
            const authToken = res.accessToken.split("Bearer ")[1];
            setCookie("token", authToken);
            options.headers.Authorization = res.accessToken;
            return fetch(url, options).then((res) => checkResponse(res));
          });
        } else {
          return Promise.reject(err);
        }
      });
    });
};
