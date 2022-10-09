import { setCookie } from "../utils/cookie";

export const baseUrl = "https://norma.nomoreparties.space/api";
export const baseAuthUrl = `${baseUrl}/auth`;

export const checkAuthResponse = (res) => {
  if (
    (res) => {
      let authToken;
      // Ищем интересующий нас заголовок
      res.headers.forEach((header) => {
        if (header.indexOf("Bearer") === 0) {
          // Отделяем схему авторизации от "полезной нагрузки токена",
          // Стараемся экономить память в куках (доступно 4кб)
          authToken = header.split("Bearer ")[1];
        }
      });
      if (authToken) {
        // Сохраняем токен в куку token
        setCookie("token", authToken);
      }
      return res.json();
    }
  )
    return Promise.reject(`Ошибка ${res.status}`);
};

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const modalsRoot = document.querySelector("#react-modals");
