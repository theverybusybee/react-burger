import { baseUrl, checkResponse, baseAuthUrl } from "./constants";
import { getCookie } from "./cookie";
import { fetchWithRefresh } from "../services/actions/auth";
import { fetchWithRefreshToken } from "../services/actions/auth";

export const fetchOrderDetails = (ingredients) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  };

  return fetch(`${baseUrl}/orders`, requestOptions).then(checkResponse);
};

export const fetchIngredients = () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  };

  return fetch(`${baseUrl}/ingredients`, requestOptions).then(checkResponse);
};

export const fetchForgotPassword = (form) => {
  const requestOptions = {
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

export const fetchResetPassword = (form) => {
  const requestOptions = {
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

// export const fetchRegister = (form) => {
//   const token = getCookie('token');
//   const requestOptions = {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-type": "application/json",
//       Authorization: token
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify(form),
//   };

//   return fetchWithRefresh(`${baseAuthUrl}/register`, requestOptions).then(checkResponse);
// };

export const fetchRegister = (form) => {
  const requestOptions = {
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

// export const fetchLogin = (form) => {
//   const token = getCookie('token');
//   const requestOptions = {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-type": "application/json",
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify(form),
//   };

//   return fetchWithRefresh(`${baseAuthUrl}/login`, requestOptions).then(checkResponse);
// };

export const fetchLogin = (form) => {
  const requestOptions = {
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
  const requestOptions = {
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
  const requestOptions = {
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

export const updateUserData = (name, email) => {
  const requestOptions = {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  };

  return fetchWithRefreshToken(`${baseAuthUrl}/user`, requestOptions).then(
    checkResponse
  );
};

export const getUserData = (token) => {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(),
  };

  return fetchWithRefreshToken(`${baseAuthUrl}/user`, requestOptions).then(
    checkResponse
  );
};
