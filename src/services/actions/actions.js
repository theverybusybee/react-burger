import {
  fetchIngredients,
  fetchOrderDetails,
} from "../../utils/fetchOrderData";

/* api reducer */
export const FETCH_API_REQUEST = "FETCH_API_REQUEST";
export const FETCH_API_SUCCESS = "FETCH_API_SUCCESS";
export const FETCH_API_ERROR = "FETCH_API_ERROR";

/* order reducer */
export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const ADD = "ADD";
export const RESET = "RESET";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";

export const SET_CURRENT_CONSTRUCTOR_INGREDIENTS =
  "SET_CURRENT_CONSTRUCTOR_INGREDIENTS";

export const SET_BUNS = "SET_BUNS";

export const SET_MODAL_INGREDIENT = "SET_MODAL_INGREDIENT";
export const RESET_MODAL_INGREDIENT = "SET_MODAL_INGREDIENT";

export const RESET_ORDER_NUMBER = 'RESET_ORDER_NUMBER';

export function getIngredients() {
  return function (dispatch) {
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

export function getOrderNumber(ingredients) {
  return function (dispatch) {
    dispatch({ type: GET_ORDER_NUMBER_REQUEST });
    fetchOrderDetails(ingredients)
      .then((res) => {
        if (res && res.success) {
          console.log(res.order.number);
          dispatch({
            type: GET_ORDER_NUMBER_SUCCESS,
            payload: res.order.number,
          });
        } else {
          dispatch({ type: GET_ORDER_NUMBER_FAILED });
        }
      })
      .catch(() =>
        dispatch({
          type: GET_ORDER_NUMBER_FAILED,
        })
      );
  };
}
