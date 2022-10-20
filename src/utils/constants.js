export const baseUrl = "https://norma.nomoreparties.space/api";
export const baseAuthUrl = `${baseUrl}/auth`;

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const modalsRoot = document.querySelector("#react-modals");

export const data2 = {
  success: true,
  orders: [
    {
      ingredients: [
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733cf",
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733cc",
      ],
      _id: "",
      status: "done",
      number: 124322,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
      name: "Death Star Starship Main бургер",
    },
    {
      ingredients: [
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cd",
      ],
      _id: "",
      status: "done",
      number: 123423,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
      name: "Death Star Starship Main бургер",
    },
    {
      ingredients: [
         "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733cf",
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733cc",
      ],
      _id: "",
      status: "inProcess",
      number: 21432,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
      name: "Death Star Starship Main бургер",
    },
    {
      ingredients: [
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cd",
      ],
      _id: "",
      status: "inProcess",
      number: 324231,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
      name: "Death Star Starship Main бургер",
    },
  ],
  total: 14343,
  totalToday: 13422,
};
