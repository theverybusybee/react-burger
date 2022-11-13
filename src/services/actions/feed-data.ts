import { SET_CURRENT_ORDER } from "../constants/feed-data";
import { TIngredient } from "../types/data";

export interface IFeedData {
  readonly type: typeof SET_CURRENT_ORDER;
  currentOrder: ReadonlyArray<TIngredient>;
}
