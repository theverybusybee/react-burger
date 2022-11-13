import { deleteCookie, setCookie } from "../../utils/cookie";
import {
  fetchRegister,
  fetchLogin,
  fetchLogout,
  updateUserData,
  getUserData,
} from "../../utils/fetchOrderData";
import { fetchToken } from "../../utils/fetchOrderData";
import {
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_ERROR,
  DELETE_USER,
  SET_LOGIN_STATUS,
  FETCH_REFRESH_TOKEN_REQUEST,
  FETCH_REFRESH_TOKEN_SUCCESS,
  FETCH_REFRESH_TOKEN_ERROR,
} from "../constants/auth";
import { TUserData } from "../types/data";

export interface IAuthRequestAction {
  readonly type: typeof FETCH_AUTH_REQUEST;
}

export interface IAuthSuccessAction {
  readonly type: typeof FETCH_AUTH_SUCCESS;
  userInfo: Omit<TUserData, "password">;
}

export interface IAuthFailedAction {
  readonly type: typeof FETCH_AUTH_ERROR;
}

export interface IRefreshUserDataAction {
  readonly type: typeof DELETE_USER;
}

export interface ISetLoginStatusAction {
  readonly type: typeof SET_LOGIN_STATUS;
}

// регистрация
export function setRegister(form: any) {
  return function (dispatch: any) {
    dispatch({ type: FETCH_AUTH_REQUEST });
    fetchRegister(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: FETCH_AUTH_SUCCESS,
            payload: res,
          });
          dispatch({ type: SET_LOGIN_STATUS });
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
export function authenticateUser(form: any) {
  return function (dispatch: any) {
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
  return function (dispatch: any) {
    dispatch({ type: FETCH_REFRESH_TOKEN_REQUEST });
    fetchToken()
      .then((res) => {
        if (res && res.success) {
          deleteCookie("token");
          localStorage.removeItem("refreshToken");
          const authToken = res.accessToken.split("Bearer ")[1];
          setCookie("token", authToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({ type: FETCH_REFRESH_TOKEN_SUCCESS });
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
  return function (dispatch: any) {
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
export function updateData(name: string, email: string) {
  return function (dispatch: any) {
    dispatch({ type: FETCH_AUTH_REQUEST });
    updateUserData(name, email)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: FETCH_AUTH_SUCCESS,
            payload: res,
          });
          dispatch({ type: SET_LOGIN_STATUS });
        }
      })
      .catch(() => dispatch(refreshAccessToken()));
  };
}

// получение данных юзера
export function getData() {
  return function (dispatch: any) {
    dispatch({ type: FETCH_AUTH_REQUEST });
    getUserData()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: FETCH_AUTH_SUCCESS,
            payload: res,
          });
          dispatch({ type: SET_LOGIN_STATUS });
        }
      })
      .catch(() => {
        dispatch(refreshAccessToken());
      });
  };
}