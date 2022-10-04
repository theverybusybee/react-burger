import { baseUrl, checkResponse as checkResponse } from "./constants";

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

export const fetchForgotPassword = (state) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state),
  };

  return fetch(`${baseUrl}/password-reset`, requestOptions).then(checkResponse);
};
