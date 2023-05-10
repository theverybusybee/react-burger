import { v4 as uuidv4 } from "uuid";
import { TDropContainerActions } from "../actions/drop-container";

import {
  SET_CONSTRUCTOR_ELEMENT,
  REMOVE_CONSTRUCTOR_ELEMENT,
  SET_TOTAL_PRICE,
  RESET_TOTAL_PRICE,
  SET_BUNS,
  SET_ORDER_INGREDIENTS,
  RESET_ORDER_INGREDIENTS,
} from "../constants/drop-container";
import { TIngredient } from "../types/data";

type TDropContainerReducer = {
  constructorElements: Array<TIngredient>;
  totalPrice: number;
  buns: Array<TIngredient> | [];
  orderIngredients: Array<TIngredient>;
};

const initialState: TDropContainerReducer = {
  constructorElements: [],
  totalPrice: 0,
  buns: [],
  orderIngredients: [],
};

const dropContainerReducer = (
  state = initialState,
  action: TDropContainerActions
): TDropContainerReducer => {
  switch (action.type) {
    case SET_CONSTRUCTOR_ELEMENT:
      return {
        ...state,
        constructorElements: [
          ...state.constructorElements,
          { ...action.payload, uuid: uuidv4() },
        ],
      };

    case REMOVE_CONSTRUCTOR_ELEMENT:
      return {
        ...state,
        constructorElements: [...state.constructorElements].filter(
          (item) => item.uuid !== action.uuid
        ),
      };

    case SET_BUNS:
      return { ...state, buns: [action.payload] };

    case SET_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload,
      };

    case RESET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: initialState.totalPrice,
      };
    }

    case SET_ORDER_INGREDIENTS:
      return {
        ...state,
        orderIngredients: state.constructorElements.concat(
          state.buns,
          state.buns
        ),
      };

    case RESET_ORDER_INGREDIENTS:
      return {
        ...state,
        orderIngredients: initialState.orderIngredients,
        constructorElements: initialState.constructorElements,
        buns: initialState.buns,
      };

    default:
      return state;
  }
};

export default dropContainerReducer;

