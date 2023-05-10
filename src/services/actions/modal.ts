import {
  SET_MODAL_INGREDIENT,
  RESET_ORDER_NUMBER,
  SET_ORDER_NUMBER_VISIBILITY,
} from "../constants/modal";
import { TIngredient } from "../types/data";

export interface ISetModalIngredientAction {
  payload: {} | ReadonlyArray<TIngredient>;
  readonly type: typeof SET_MODAL_INGREDIENT;
}

export interface ISetOrderNumberVisibilityAction {
  readonly type: typeof SET_ORDER_NUMBER_VISIBILITY;
}

export interface IResetOrderNumberAction {
  readonly type: typeof RESET_ORDER_NUMBER;
}

export type TModalsActions =
  | ISetModalIngredientAction
  | ISetOrderNumberVisibilityAction
  | IResetOrderNumberAction;
