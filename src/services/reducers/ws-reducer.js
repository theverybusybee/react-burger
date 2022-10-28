import { v4 as uuidv4 } from "uuid";

import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "../actions/ws-actions";

const initialState = {
  wsConnected: false,
  error: undefined,
  allOrders: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

const wsReducer = (state = initialState, { type, payload, uuid }) => {
  switch (type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: payload,
        wsConnected: false,
      };

    // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
    // Установим флаг wsConnected в состояние false
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    // Опишем обработку экшена с типом WS_GET_ORDERS
    // Обработка происходит, когда с сервера возвращаются данные
    // В messages передадим данные, которые пришли с сервера
    case WS_GET_ORDERS:
      return {
        ...state,
        error: undefined,
        allOrders: {
          orders: 
            payload.data.orders.map((el) => {
              return {...el, uuid: uuidv4()}
            })
          ,
          total: payload.data.total,
          totalToday: payload.data.totalToday,
        },
      };

    default:
      return state;
  }
};

export default wsReducer;
