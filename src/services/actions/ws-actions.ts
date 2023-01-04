import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_SEND_MESSAGE,
  wsActions,
} from "../constants/ws-actions";
import { TOrders } from "../types/data";

export interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  error: any;
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetOrdersAction {
  payload: any;
  readonly type: typeof WS_GET_ORDERS;
  allOrders: {
    orders: ReadonlyArray<TOrders>;
    total: number;
    totalToday: number;
  };
}

export interface IWSConnectionSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
}

export type TMiddlewareWSActions = typeof wsActions;


export type TWSActions =
  | IWSConnectionStartAction
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetOrdersAction
  | IWSConnectionSendMessage;

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

export const wsGetOrders = (orders: {}) => {
  return {
    type: WS_GET_ORDERS,
    payload: orders,
  };
};

export const wsSendMessage = (message: {}) => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message,
  };
};
