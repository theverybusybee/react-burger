import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_ORDERS,
  WS_CONNECTION_CLOSED,
} from "../actions/ws-actions";

export const socketMiddleware = (wsUrl) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_CLOSED && socket) {
        if (socket.readyState === 1) {
          socket.close();
        }
      }

      if (type === WS_CONNECTION_START) {
        if (socket === null) {
          socket = new WebSocket(`${wsUrl}${payload.add}`);
        } else if (socket.readyState === 3 || socket.readyState === 2) {
          socket = new WebSocket(`${wsUrl}${payload.add}`);
        }
      }

      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        // функция, которая вызывается при получении события от сервера

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({
            type: WS_GET_ORDERS,
            payload: {
              data: restParsedData,
            },
          });
        };
        // функция, которая вызывается при закрытии соединения

        // if (type === WS_SEND_MESSAGE) {
        //   const message = payload;
        //             // функция для отправки сообщения на сервер
        //   socket.send(JSON.stringify(message));
        // }
      }

      next(action);
    };
  };
};
