import {
  TFetchLogin,
  TFetchRegister,
  TForgotPassword,
  TIngredient,
  TResetPassword,
  TUserDataParams
} from "../services/types/data";
import { baseUrl, checkResponse, baseAuthUrl } from "./constants";
import { getCookie } from "./cookie";

type TRequestOptions = {
  method: "POST" | "GET" | "PATCH";
  mode: RequestMode | undefined;
  cache: RequestCache | undefined;
  credentials: RequestCredentials | undefined;
  redirect: RequestRedirect | undefined;
  referrerPolicy: ReferrerPolicy | undefined;
  headers: {
    "Content-Type": "application/json";
    Authorization?: string;
  };
  body?: any;
};

export const fetchOrderDetails = (ingredients: Array<TIngredient>) => {
  const requestOptions: TRequestOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({ ingredients }),
  };

  return fetch(`${baseUrl}/orders`, requestOptions).then(checkResponse);
};

export const fetchIngredients = () => {
  const requestOptions: TRequestOptions = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(`${baseUrl}/ingredients`, requestOptions).then(checkResponse);
};

export const fetchForgotPassword = (form: TForgotPassword) => {
  const requestOptions: TRequestOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  };

  return fetch(`${baseUrl}/password-reset`, requestOptions).then(checkResponse);
};

export const fetchResetPassword = (form: TResetPassword) => {
  const requestOptions: TRequestOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  };

  return fetch(`${baseUrl}/password-reset/reset`, requestOptions).then(
    checkResponse
  );
};

export const fetchRegister = (form: TFetchRegister) => {
  const requestOptions: TRequestOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  };

  return fetch(`${baseAuthUrl}/register`, requestOptions).then(checkResponse);
};

export const fetchLogin = (form: TFetchLogin) => {
  const requestOptions: TRequestOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  };

  return fetch(`${baseAuthUrl}/login`, requestOptions).then(checkResponse);
};

export const fetchLogout = () => {
  const requestOptions: TRequestOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };

  return fetch(`${baseAuthUrl}/logout`, requestOptions).then(checkResponse);
};

export const fetchToken = () => {
  const requestOptions: TRequestOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };

  return fetch(`${baseAuthUrl}/token`, requestOptions).then(checkResponse);
};

export const updateUserData = (form: TUserDataParams) => {
  const requestOptions: TRequestOptions = {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  };

  return fetch(`${baseAuthUrl}/user`, requestOptions).then(checkResponse);
};

export const getUserData = () => {
  const requestOptions: TRequestOptions = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  return fetch(`${baseAuthUrl}/user`, requestOptions).then(checkResponse);
};
