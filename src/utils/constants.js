export const baseUrl = "https://norma.nomoreparties.space/api";
export const baseAuthUrl = `${baseUrl}/auth`;

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const modalsRoot = document.querySelector('#react-modals');
