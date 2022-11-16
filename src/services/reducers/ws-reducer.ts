import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "../constants/ws-actions";
import { TWSActions } from "../actions/ws-actions";
import { TOrders } from "../types/data";

type TWSReducerInitialState = {
  wsConnected: boolean;
  error: boolean;
  isRefreshed: boolean;
  allOrders: {
    orders: ReadonlyArray<TOrders> | [];
    total: number;
    totalToday: number;
  };
};

const initialState: TWSReducerInitialState = {
  wsConnected: false,
  error: false,
  isRefreshed: false,
  allOrders: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

const wsReducer = (
  state = initialState,
  action: TWSActions
): TWSReducerInitialState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: initialState.error,
        wsConnected: true,
        isRefreshed: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: true,
        wsConnected: false,
      };

    // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
    // Установим флаг wsConnected в состояние false
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: initialState.error,
        wsConnected: false,
        isRefreshed: false,
      };

    // Опишем обработку экшена с типом WS_GET_ORDERS
    // Обработка происходит, когда с сервера возвращаются данные
    // В messages передадим данные, которые пришли с сервера
    case WS_GET_ORDERS:
      return {
        ...state,
        error: initialState.error,
        allOrders: {
          orders: action.payload.data.orders,
          total: action.payload.data.total,
          totalToday: action.payload.data.totalToday,
        },
      };

    default:
      return state;
  }
};

export default wsReducer;
