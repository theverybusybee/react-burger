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

export interface ISetConstructorElementAction {
  readonly type: typeof SET_CONSTRUCTOR_ELEMENT;
  payload: ReadonlyArray<TIngredient>;
  uuid?: string;
}

export interface IRemoveConstructorElementAction {
  readonly type: typeof REMOVE_CONSTRUCTOR_ELEMENT;
  uuid?: string;
}

export interface ISetTotalPriceAction {
  readonly type: typeof SET_TOTAL_PRICE;
  payload: number;
}

export interface IResetTotalPriceAction {
  readonly type: typeof RESET_TOTAL_PRICE;
}

export interface ISetBunsAction {
  readonly type: typeof SET_BUNS;
  payload: TIngredient;
}

export interface ISetOrderIngredientsAction {
  readonly type: typeof SET_ORDER_INGREDIENTS;
}

export interface IResetOrderIngredientsAction {
  readonly type: typeof RESET_ORDER_INGREDIENTS;
}

export type TDropContainerActions =
  | ISetConstructorElementAction
  | IRemoveConstructorElementAction
  | ISetTotalPriceAction
  | IResetTotalPriceAction
  | ISetBunsAction
  | ISetOrderIngredientsAction
  | IResetOrderIngredientsAction;
