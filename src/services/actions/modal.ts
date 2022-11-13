import {
  SET_MODAL_INGREDIENT,
  RESET_ORDER_NUMBER,
  SET_ORDER_NUMBER_VISIBILITY,
} from "../constants/modal";
import { TIngredient } from "../types/data";

export interface ISetModalIngredientAction {
  readonly type: typeof SET_MODAL_INGREDIENT;
  currentModalIngredient: ReadonlyArray<TIngredient>;
}

export interface ISetOrderNumberVisibilityAction {
  readonly type: typeof SET_ORDER_NUMBER_VISIBILITY;
}

export interface IResetOrderNumberAction {
  readonly type: typeof RESET_ORDER_NUMBER;
}
