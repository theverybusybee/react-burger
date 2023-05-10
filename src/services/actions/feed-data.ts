import { SET_CURRENT_ORDER } from "../constants/feed-data";
import { TOrders } from "../types/data";

export interface IFeedData {
  readonly type: typeof SET_CURRENT_ORDER;
  payload: {} | TOrders[];
}

export type TFeedDataActions =
  | IFeedData;