export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_ORDERS = "WS_GET_ORDERS";
export const WS_SEND_MESSAGE = "WS_SEND_MESSAGE";

export const wsUrl = "wss://norma.nomoreparties.space/orders";

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
};

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetOrders = (orders) => {
  return {
    type: WS_GET_ORDERS,
    payload: orders,
  };
};

// export const wsSendMessage = message => {
//   return {
//     type: WS_SEND_MESSAGE,
//     payload: message
//   };
// };

export const wsSendMessage = (message) => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message,
  };
};
