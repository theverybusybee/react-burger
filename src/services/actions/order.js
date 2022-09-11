import { fetchIngredients } from "../../utils/fetchOrderData";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const SET_CURRENT_CONSTRUCTOR_INGREDIENTS = 'SET_CURRENT_CONSTRUCTOR_INGREDIENTS';

export const SET_BUNS = 'SET_BUNS';

export const SET_MODAL_INGREDIENT = 'SET_MODAL_INGREDIENT';
export const DELETE_MODAL_INGREDIENT = 'SET_MODAL_INGREDIENT';

export function getIngredients() {
  return function(dispatch) {
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
  };


      
