export const baseUrl = "https://norma.nomoreparties.space/api";
export const baseAuthUrl = `${baseUrl}/auth`;

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const modalsRoot = document.querySelector("#react-modals");

export const getDate = (setDate) => {
  const enteringDate = new Date(setDate);
  const enter = enteringDate.toLocaleDateString("ru").slice(0, 2)
  const hours = enteringDate.getHours();
  const minutes = enteringDate.getMinutes();
  const today = new Date().toLocaleDateString("ru").slice(0, 2)
  const day = (() => {
    if ((today - enter) === 0) {
      return 'Сегодня';
    } else if((today - enter) === 1 ) {
      return "Вчера";
    } else return enteringDate.toLocaleDateString("ru", {timeZone: 'Europe/Moscow'});
  })();
  return `${day}, ${hours}:${minutes} i-GMT+3`;
};