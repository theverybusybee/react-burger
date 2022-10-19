import { setCookie } from "../../utils/cookie";
import {
  fetchRegister,
  fetchLogin,
  fetchLogout,
  updateUserData,
  getUserData,
} from "../../utils/fetchOrderData";
import { checkResponse } from "../../utils/constants";
import { fetchToken } from "../../utils/fetchOrderData";

export const SET_USER_INFO = "SET_USERNAME";
export const FETCH_AUTH_REQUEST = "FETCH_AUTH_REQUEST";
export const FETCH_AUTH_SUCCESS = "FETCH_AUTH_SUCCESS";
export const FETCH_AUTH_ERROR = "FETCH_AUTH_ERROR";
export const DELETE_USER = "DELETE_USER";
export const SET_LOGIN_STATUS = "SET_LOGIN_STATUS";

export const FETCH_REFRESH_TOKEN_REQUEST = "FETCH_REFRESH_TOKEN_REQUEST";
export const FETCH_REFRESH_TOKEN_SUCCESS = "FETCH_REFRESH_TOKEN_SUCCESS";
export const FETCH_REFRESH_TOKEN_ERROR = "FETCH_REFRESH_TOKEN_ERROR";

// регистрация
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

// аутентификация
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

export function refreshAccessToken() {
  return function (dispatch) {
    dispatch({ type: FETCH_REFRESH_TOKEN_REQUEST });
    fetchToken()
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("refreshToken", res.refreshToken);
          const authToken = res.accessToken.split("Bearer ")[1];
          setCookie("token", authToken);
          dispatch({ type: FETCH_REFRESH_TOKEN_SUCCESS });
        } else {
          dispatch({ type: FETCH_REFRESH_TOKEN_ERROR });
        }
      })
      .catch(() =>
        dispatch({
          type: FETCH_REFRESH_TOKEN_ERROR,
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
            type: DELETE_USER,
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

// обновление данных профиля
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
      .catch(() =>
        dispatch({
          type: FETCH_AUTH_ERROR,
        })
      );
  };
}

// получение данных юзера
export function getData() {
  return function (dispatch) {
    dispatch({ type: FETCH_AUTH_REQUEST });
    getUserData()
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
      .catch((err) =>
        dispatch({
          type: FETCH_AUTH_ERROR,
        })
      );
  };
}

// запрос на смену токена
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
