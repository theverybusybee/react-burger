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
  const currentDate = new Date();
  const enterDay = enteringDate.toLocaleDateString("ru").slice(0, 2);
  const hours = enteringDate.getHours();
  const minutes = enteringDate.getMinutes();
  const today = currentDate.toLocaleDateString("ru").slice(0, 2);
  const gotMonth = enteringDate.getMonth();
  const currentMonth = currentDate.getMonth();
  const gotYear = enteringDate.getFullYear();
  const currentYear = currentDate.getFullYear();

  const day = (() => {
    if (gotMonth === currentMonth && gotYear === currentYear) {
      switch (Number(today) - Number(enterDay)) {
        case 0:
          return "Сегодня";
        case 1:
          return "Вчера";
      }
    }
     return enteringDate.toLocaleDateString("ru", {
        timeZone: "Europe/Moscow",
      });
  })();

  return `${day}, ${hours}:${minutes} i-GMT+3`;
};
