import {
  fetchOrderDetails,
} from "../../utils/fetches";
import { fetchIngredients } from "../../utils/fetches";
import { refreshAccessToken } from "./auth";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  RESET_ORDER_NUMBER,
} from "../constants/api-data";
import { TIngredient } from "../types/data";
import { TAppDispatch } from "../store";

export interface IGetIngredientAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientActionFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientActionSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  payload: Array<TIngredient>;
}

export interface IGetOrderNumberAction {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}

export interface IGetOrderNumberSuccess {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  payload: number;
}

export interface IResetOrderNumber {
  readonly type: typeof RESET_ORDER_NUMBER;
}

export function getIngredients() {
  return function (dispatch: TAppDispatch) {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    fetchIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({ type: GET_INGREDIENTS_FAILED });
        }
      })
      .catch(() =>
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        })
      );
  };
}

export function getOrderNumber(ingredients: Array<TIngredient>) {
  return function (dispatch: TAppDispatch) {
    dispatch({ type: GET_ORDER_NUMBER_REQUEST });
    fetchOrderDetails(ingredients)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_NUMBER_SUCCESS,
            payload: res.order.number,
          });
        }
      })
      .catch(() => dispatch(refreshAccessToken()));
  };
}


export type TApiDataActions =
  IGetIngredientAction
  | IGetIngredientActionFailed
  | IGetIngredientActionSuccess
  | IGetOrderNumberAction
  | IGetOrderNumberSuccess
  | IResetOrderNumber;