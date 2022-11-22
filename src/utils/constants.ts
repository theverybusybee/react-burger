export const baseUrl = "https://norma.nomoreparties.space/api";
export const baseAuthUrl = `${baseUrl}/auth`;

export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};

export const modalsRoot = document.querySelector("#react-modals");

export const getDate = (setDate: string) => {
  const enteringDate = new Date(setDate);
  const enter = enteringDate.toLocaleDateString("ru").slice(0, 2)
  const hours = enteringDate.getHours();
  const minutes = enteringDate.getMinutes();
  const today = new Date().toLocaleDateString("ru").slice(0, 2)
  const day = (() => {
    if ((Number(today) - Number(enter)) === 0) {
      return 'Сегодня';
    } else if((Number(today) - Number(enter)) === 1 ) {
      return "Вчера";
    } else return enteringDate.toLocaleDateString("ru", {timeZone: 'Europe/Moscow'});
  })();
  return `${day}, ${hours}:${minutes} i-GMT+3`;
};