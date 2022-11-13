import {
  FETCH_API_REQUEST,
  FETCH_API_SUCCESS,
  FETCH_API_ERROR,
} from "../constants/api-state";
import { TIngredient } from "../types/data";

export interface IApiRequestAction {
  readonly type: typeof FETCH_API_REQUEST;
}

export interface IApiRequestFailedAction {
  readonly type: typeof FETCH_API_ERROR;
}

export interface IApiRequestSuccessAction {
  readonly type: typeof FETCH_API_SUCCESS;
  data: ReadonlyArray<TIngredient>;
}

export type TApiStateActions =
  | IApiRequestAction
  | IApiRequestFailedAction
  | IApiRequestSuccessAction;
