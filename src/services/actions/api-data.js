import {
  fetchIngredients,
  fetchOrderDetails,
} from "../../utils/fetchOrderData";
import { refreshAccessToken } from "./auth";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
} from "../constants/api-data";

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
          dispatch({
            type: GET_ORDER_NUMBER_SUCCESS,
            payload: res,
          });
        }
      })
      .catch(() => dispatch(refreshAccessToken()));
  };
}
