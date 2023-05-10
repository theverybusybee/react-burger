import { Middleware, MiddlewareAPI } from "redux";
import { TMiddlewareWSActions } from "../actions/ws-actions";
import { OPEN, CLOSING, CLOSED } from "../constants/ws-actions";
import { TAppDispatch, TRootState } from "../store";

export const socketMiddleware = (wsUrl: string, wsActions: TMiddlewareWSActions): Middleware => {
  return (store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: null | WebSocket = null;
    const { wsInit, onOpen, onError, onClose, onMessage } = wsActions;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === onClose && socket) {
        if (socket.readyState === OPEN) {
          socket.close();
        }
      }

      if (type === wsInit) {
        if (socket === null) {
          socket = new WebSocket(`${wsUrl}${payload.add}`);
        } else if (
          socket.readyState === CLOSED ||
          socket.readyState === CLOSING
        ) {
          socket = new WebSocket(`${wsUrl}${payload.add}`);
        }
      }

      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        // функция, которая вызывается при получении события от сервера

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({
            type: onMessage,
            payload: {
              data: restParsedData,
            },
          });
        };
      }

      next(action);
    };
  };
};
