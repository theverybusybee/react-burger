import {
  SET_MODAL_INGREDIENT,
  SET_ORDER_NUMBER_VISIBILITY,
} from "../constants/modal";
import { TIngredient } from "../types/data";
import { TModalsActions } from "../actions/modal";

type TModalInitialState = {
  currentModalIngredient: {} | Array<TIngredient>;
  isVisible: {
    ingredient: boolean;
    order: boolean;
    orderNumber: boolean;
  };
};

const initialState: TModalInitialState = {
  currentModalIngredient: {},
  isVisible: {
    ingredient: false,
    order: false,
    orderNumber: false,
  },
};

const modalReducer = (
  state = initialState,
  action: TModalsActions
): TModalInitialState => {
  switch (action.type) {
    case SET_MODAL_INGREDIENT:
      return { ...state, currentModalIngredient: action.payload };

    case SET_ORDER_NUMBER_VISIBILITY: {
      return { ...state, isVisible: { ...state.isVisible, orderNumber: true } };
    }

    default:
      return state;
  }
};

export default modalReducer;
