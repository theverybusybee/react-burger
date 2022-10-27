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
  const enter = enteringDate.toLocaleDateString('ru-RU').slice(0, 2)
  const hours = enteringDate.getHours();
  const minutes = enteringDate.getMinutes();
  const today = new Date().toISOString().toLocaleString("ru-RU").slice(8, 10);
  const day = (() => {
    if ((today - enter) === 0) {
      return 'Сегодня';
    } else if((today - enter) === 1 ) {
      return "Вчера";
    } else return enteringDate.toLocaleString("ru-RU");
  })();
  return `${day}, ${hours}:${minutes} i-GMT+3`;
};